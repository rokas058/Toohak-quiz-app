package com.sourcery.km.exception;

import org.springframework.http.HttpStatus;

public class EntityAlreadyExistsException extends MainException {
    public EntityAlreadyExistsException(String message) {
        super(message, "EntityAlreadyExistsException", HttpStatus.CONFLICT);
    }
}
