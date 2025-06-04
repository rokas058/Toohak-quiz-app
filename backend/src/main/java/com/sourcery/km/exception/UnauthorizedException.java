package com.sourcery.km.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends MainException {
    public UnauthorizedException(String unauthorizedException) {
        super(unauthorizedException, "Unauthorized exception", HttpStatus.UNAUTHORIZED);
    }
}
