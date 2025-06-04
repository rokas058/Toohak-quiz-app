package com.sourcery.km.controller;

import com.sourcery.km.service.websocket.WsSessionService;
import com.sourcery.km.util.SessionAttributeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Slf4j
@Component
@RequiredArgsConstructor
public class WsController {
    private final WsSessionService wsSessionService;

    @EventListener
    public void handleSessionSubscribeEvent(SessionSubscribeEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String destination = headerAccessor.getDestination();
        String connectionType = SessionAttributeUtil.safelyGetSessionAttribute(headerAccessor, "connectionType");
        if (destination == null)
            return;

        String[] parts = destination.split("/");
        if (parts.length < 4)
            return;
        String quizSessionId = parts[3];
        SessionAttributeUtil.safelySetSessionAttribute(headerAccessor, "quizSessionId", quizSessionId);

        if ("player".equals(connectionType) && destination.matches("/topic/session/[^/]+/players")) {
            wsSessionService.handlePlayerSubscription(headerAccessor, quizSessionId);
        } else if ("host".equals(connectionType) && destination.matches("/topic/session/[^/]+/host")) {
            wsSessionService.handleHostSubscription(headerAccessor, quizSessionId);
        }
    }

    @EventListener
    public void handleSessionDisconnectEvent(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        wsSessionService.handleDisconnectSubscription(headerAccessor);
    }
}
