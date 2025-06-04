package com.sourcery.km.configuration;

import com.sourcery.km.dto.quizPlayer.QuizPlayerDTO;
import com.sourcery.km.exception.WebSocketAuthenticationException;
import com.sourcery.km.service.JwtService;
import com.sourcery.km.util.SessionAttributeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
@Slf4j
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private final JwtService jwtService;

    private final JwtDecoder jwtDecoder;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Topic structure:
        // /topic/session/{quizSessionId}/{hostPass}/host - Messages intended for quiz hosts
        // /topic/session/{quizSessionId}/players - Messages intended for quiz players
        // /topic/session/{quizSessionId}/all - Messages intended for all participants
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    String authHeader = accessor.getFirstNativeHeader("Authorization");
                    if (authHeader != null && authHeader.startsWith("Bearer ")) {
                        String jwt = authHeader.substring(7);

                        try {
                            // Check if it's a player token
                            if (jwtService.isPlayerToken(jwt)) {
                                if (!jwtService.validateToken(jwt)) {
                                    throw new WebSocketAuthenticationException("Authentication failed:" +
                                            " Invalid or expired token");
                                }

                                // Process player token
                                QuizPlayerDTO player = jwtService.getPlayerFromToken(jwt);
                                SessionAttributeUtil.safelySetSessionAttribute(accessor, "connectionType",
                                        "player");
                                SessionAttributeUtil.safelySetSessionAttribute(accessor, "player", player);
                                SessionAttributeUtil.safelySetSessionAttribute(accessor, "quizSessionId",
                                        player.getQuizSessionId().toString());

                                log.info("Player connected: {}", player.getNickname());
                            } else {
                                // For Auth0 tokens, use Spring's JWT decoder
                                try {
                                    Jwt decodedJwt = jwtDecoder.decode(jwt);
                                    String sub = decodedJwt.getSubject();

                                    SessionAttributeUtil.safelySetSessionAttribute(accessor, "connectionType",
                                            "host");
                                    SessionAttributeUtil.safelySetSessionAttribute(accessor, "userId", sub);

                                    log.info("Host connected with ID: {}", sub);
                                } catch (Exception e) {
                                    log.error("Error validating Auth0 token: {}",
                                            e.getMessage());
                                    throw new WebSocketAuthenticationException("Authentication failed:" +
                                            " Invalid Auth0 token");
                                }
                            }
                        } catch (Exception e) {
                            log.error("Error processing token: {}", e.getMessage());
                        }
                    }
                }
                return message;
            }
        });
    }
}
