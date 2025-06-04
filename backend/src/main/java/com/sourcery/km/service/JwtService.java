package com.sourcery.km.service;

import com.sourcery.km.configuration.properties.JwtProperties;
import com.sourcery.km.dto.quizPlayer.QuizPlayerDTO;
import com.sourcery.km.dto.quizSession.JoinSessionDTO;
import com.sourcery.km.exception.UnauthorizedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class JwtService {
    private final JwtProperties jwtProperties;

    public UUID getPlayerId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof String token)) {
            throw new UnauthorizedException("User not authenticated");
        }
        Claims claims = extractAllClaims(token);
        return UUID.fromString(claims.getSubject());
    }

    public QuizPlayerDTO getAnonymousUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof String token)) {
            throw new UnauthorizedException("User not authenticated");
        }
        return getPlayerFromToken(token);
    }

    public QuizPlayerDTO getPlayerFromToken(String token) {
        Claims claims = extractAllClaims(token);

        String quizSessionIdStr = claims.get("quizSessionId", String.class);
        String nickname = claims.get("nickname", String.class);
        UUID quizSessionId = UUID.fromString(quizSessionIdStr);
        UUID id = UUID.fromString(claims.getSubject());

        return QuizPlayerDTO.builder()
                .userId(id)
                .nickname(nickname)
                .quizSessionId(quizSessionId)
                .build();
    }

    public boolean isPlayerToken(String token) {
        try {
            Claims claims = extractAllClaims(token);
            return claims.containsKey("nickname") && claims.containsKey("quizSessionId");
        } catch (Exception e) {
            return false;
        }
    }

    public JoinSessionDTO createNewSession(QuizPlayerDTO anonymousUser) {
        return JoinSessionDTO.builder()
                .tokenType(JwtProperties.TOKENTYPE)
                .expiresInSeconds(String.valueOf(jwtProperties.getExpiresInSeconds()))
                .accessToken(generateAccessToken(anonymousUser))
                .build();
    }

    public String extractId(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private String generateAccessToken(QuizPlayerDTO anonymousUser) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("quizSessionId", anonymousUser.getQuizSessionId());
        claims.put("nickname", anonymousUser.getNickname());
        return createToken(claims, anonymousUser.getUserId());
    }

    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build().parseSignedClaims(token).getPayload();
    }

    private String createToken(Map<String, Object> claims, UUID anonymousUserId) {
        return Jwts.builder().claims(claims)
                .subject(anonymousUserId.toString())
                .issuedAt(new Date()).expiration(
                        new Date(System.currentTimeMillis() + jwtProperties.getExpiresInSeconds() * 1000L))
                .signWith(getSignKey())
                .compact();
    }

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
