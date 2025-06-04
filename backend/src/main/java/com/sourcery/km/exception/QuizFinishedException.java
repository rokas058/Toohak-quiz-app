package com.sourcery.km.exception;

import org.springframework.http.HttpStatus;

public class QuizFinishedException extends MainException {
    public QuizFinishedException(String message) {
        super(message, "Quiz is finished", HttpStatus.NO_CONTENT);
    }
}
