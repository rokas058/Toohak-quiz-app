package com.sourcery.km.exception;

import org.springframework.http.HttpStatus;

public class ConflictException extends MainException {
    public ConflictException(String message) {
        super(message, "Conflict", HttpStatus.CONFLICT);
    }
}
