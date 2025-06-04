package com.sourcery.km.exception;

import org.springframework.http.HttpStatus;

public class EntityNotFoundException extends MainException {

    public EntityNotFoundException(String message) {
        super(message, "Entity not found exception", HttpStatus.NOT_FOUND);
    }
}
