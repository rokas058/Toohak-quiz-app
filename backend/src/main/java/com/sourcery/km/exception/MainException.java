package com.sourcery.km.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public abstract class MainException extends RuntimeException {
    protected String title;

    protected HttpStatus status;

    public MainException(String message) {
        super(message);
    }

    public MainException(String message, String title, HttpStatus status) {
        super(message);
        this.title = title;
        this.status = status;
    }
}
