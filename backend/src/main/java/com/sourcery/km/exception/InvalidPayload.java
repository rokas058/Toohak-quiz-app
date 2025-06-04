package com.sourcery.km.exception;

import org.springframework.http.HttpStatus;

public class InvalidPayload extends MainException {
    public InvalidPayload(String message) {
        super(message, "Invalid payload.", HttpStatus.BAD_REQUEST);
    }
}
