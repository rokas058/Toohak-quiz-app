package com.sourcery.km.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

import java.util.Map;

@Slf4j
public final class SessionAttributeUtil {

    public static void safelySetSessionAttribute(StompHeaderAccessor accessor, String name, Object value) {
        if (accessor != null) {
            Map<String, Object> sessionAttributes = accessor.getSessionAttributes();
            if (sessionAttributes != null) {
                sessionAttributes.put(name, value);
            } else {
                log.warn("Session attributes map is null, cannot set attribute '{}'", name);
            }
        }
    }

    @SuppressWarnings("unchecked")
    public static <T> T safelyGetSessionAttribute(StompHeaderAccessor accessor, String attributeName) {
        if (accessor == null) {
            return null;
        }

        Map<String, Object> sessionAttributes = accessor.getSessionAttributes();
        if (sessionAttributes == null) {
            return null;
        }

        try {
            return (T) sessionAttributes.get(attributeName);
        } catch (ClassCastException e) {
            log.warn("Failed to cast session attribute '{}' to expected type", attributeName, e);
            return null;
        }
    }
}
