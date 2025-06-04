package com.sourcery.km.exception;

import org.springframework.http.HttpStatus;

public class BadRequestException extends MainException {
    public BadRequestException(String message) {
        super(message, "Bad request", HttpStatus.BAD_REQUEST);
    }
}
