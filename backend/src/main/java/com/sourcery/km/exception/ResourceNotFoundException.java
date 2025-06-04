package com.sourcery.km.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends MainException {
    public ResourceNotFoundException(String message) {
        super(message, "Resource not found", HttpStatus.NOT_FOUND);
    }
}
