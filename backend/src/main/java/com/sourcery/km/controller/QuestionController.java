package com.sourcery.km.controller;

import com.sourcery.km.dto.question.CreateQuestionDTO;
import com.sourcery.km.dto.question.QuestionDTO;
import com.sourcery.km.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/quizzes/{quizId}/questions")
public class QuestionController {
    private final QuestionService questionService;

    @PutMapping("/{id}")
    QuestionDTO updateQuestion(@PathVariable(value = "quizId") UUID quizId,
                        @PathVariable(value = "id") UUID id,
                        @Valid @RequestBody(required = true) QuestionDTO questionDTO) {
        return questionService.updateExistingQuestion(quizId, id, questionDTO);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public QuestionDTO createQuestion(@PathVariable(value = "quizId") UUID quizId,
                               @Valid @RequestBody CreateQuestionDTO questionDTO) {
        return questionService.insertQuestion(questionDTO, quizId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    QuestionDTO getQuestionById(@PathVariable(value = "id") UUID questionId) {
        return questionService.getQuestionById(questionId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping List<QuestionDTO> getQuestionsByQuizId (@PathVariable(value = "quizId") UUID quizId) {
        return questionService.getQuestionsByQuizId(quizId);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    public void deleteQuestion (@PathVariable(value = "id") UUID id) {
        questionService.deleteQuestion(id);
    }



}
