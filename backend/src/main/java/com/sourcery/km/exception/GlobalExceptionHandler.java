package com.sourcery.km.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({MainException.class})
    public ProblemDetail handleMainException(MainException exception) {
        return handleExceptionResponse(exception.status, exception.title, exception.getMessage());
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    public ProblemDetail handleDataIntegrityViolationException(DataIntegrityViolationException exception) {
        return handleExceptionResponse(
                HttpStatus.BAD_REQUEST,
                "Data integrity violation exception",
                exception.getCause().getMessage()
        );
    }

    private ProblemDetail handleExceptionResponse(HttpStatus status, String title, String message) {
        ProblemDetail response = ProblemDetail.forStatus(status);
        response.setTitle(title);
        response.setDetail(message);
        return response;
    }
}
