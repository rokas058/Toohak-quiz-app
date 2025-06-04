package com.sourcery.km.exception;

import org.springframework.http.HttpStatus;

public class ResourceGoneException extends MainException {
    public ResourceGoneException(String message) {
        super(message, "Resource is gone", HttpStatus.GONE);
    }
}
