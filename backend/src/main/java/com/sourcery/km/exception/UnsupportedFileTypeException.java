package com.sourcery.km.exception;

import org.springframework.http.HttpStatus;

public class UnsupportedFileTypeException extends MainException {
    public UnsupportedFileTypeException(String message) {
        super(message, "File type not allowed", HttpStatus.BAD_REQUEST);
    }
}
