package com.sourcery.km.exception;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends MainException {
    public ForbiddenException(String forbiddenException) {
        super(forbiddenException, "ForbiddenException exception", HttpStatus.FORBIDDEN);
    }
}
