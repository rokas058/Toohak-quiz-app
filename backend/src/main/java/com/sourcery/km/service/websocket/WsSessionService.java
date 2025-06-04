package com.sourcery.km.service.websocket;

import com.sourcery.km.dto.quizPlayer.QuizPlayerDTO;
import com.sourcery.km.util.SessionAttributeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class WsSessionService {
    private final WsEventSendingService wsEventSendingService;

    public void handlePlayerSubscription(StompHeaderAccessor headerAccessor, String quizSessionId) {
        QuizPlayerDTO player = SessionAttributeUtil.safelyGetSessionAttribute(headerAccessor, "player");

        if (player != null) {
            wsEventSendingService.sendPlayerJoined(quizSessionId, player);
            log.info("Player {} joined session {}", player.getNickname(), quizSessionId);
        }
    }

    public void handleHostSubscription(StompHeaderAccessor headerAccessor, String quizSessionId) {
        String userId = SessionAttributeUtil.safelyGetSessionAttribute(headerAccessor, "userId");

        if (userId != null && headerAccessor.getSessionAttributes() != null) {
            SessionAttributeUtil.safelySetSessionAttribute(headerAccessor, "isHost", true);
            log.info("Host {} joined session {}", userId, quizSessionId);
        }
    }

    public void handleDisconnectSubscription(StompHeaderAccessor headerAccessor) {
        String quizSessionId = SessionAttributeUtil.safelyGetSessionAttribute(headerAccessor, "quizSessionId");
        if (quizSessionId == null)
            return;
        Boolean isHost = SessionAttributeUtil.safelyGetSessionAttribute(headerAccessor, "isHost");
        if (Boolean.TRUE.equals(isHost)) {
            String userId = SessionAttributeUtil.safelyGetSessionAttribute(headerAccessor, "userId");
            if (userId != null) {
                wsEventSendingService.sendHostDisconnected(userId);
                log.info("Host {} disconnected from session {}", userId, quizSessionId);
            }
        } else {
            QuizPlayerDTO player = SessionAttributeUtil.safelyGetSessionAttribute(headerAccessor, "player");
            if (player != null) {
                wsEventSendingService.sendPlayerDisconnected(quizSessionId, player);
                log.info("Player {} disconnected from session {}", player.getNickname(), quizSessionId);
            }
        }
    }

}
