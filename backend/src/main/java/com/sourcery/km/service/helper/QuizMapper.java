package com.sourcery.km.service.helper;

import com.sourcery.km.dto.question.QuestionDTO;
import com.sourcery.km.dto.questionOption.QuestionOptionDTO;
import com.sourcery.km.dto.quiz.QuizDTO;
import com.sourcery.km.dto.quiz.QuizFlatRow;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Component
public class QuizMapper {

    public QuizDTO toQuizDto(List<QuizFlatRow> rows) {
        if (rows == null || rows.isEmpty()) return null;
        QuizDTO quizDto = buildQuizDto(rows.get(0));
        Map<UUID, QuestionDTO> map = buildQuestionsMap(rows);
        quizDto.setQuestions(new ArrayList<>(map.values()));
        return quizDto;
    }

    private QuizDTO buildQuizDto(QuizFlatRow row) {
        QuizDTO quizDto = new QuizDTO();
        quizDto.setId(row.getQuizId());
        quizDto.setTitle(row.getQuizTitle());
        quizDto.setDescription(row.getQuizDescription());
        quizDto.setImageId(row.getQuizImageId());
        quizDto.setCreatedBy(row.getQuizCreatedBy());
        quizDto.setCreatedAt(row.getQuizCreatedAt());
        quizDto.setUpdatedAt(row.getQuizUpdatedAt());
        quizDto.setQuestions(new ArrayList<>());
        return quizDto;
    }

    private QuestionDTO buildQuestionDto(QuizFlatRow row) {
        QuestionDTO question = new QuestionDTO();
        question.setId(row.getQuestionId());
        question.setTitle(row.getQuestionTitle());
        question.setQuizId(row.getQuizId());
        question.setImageId(row.getQuestionImageId());
        question.setQuestionOptions(new ArrayList<>());
        return question;
    }

    private QuestionOptionDTO buildOptionDto(QuizFlatRow row) {
        QuestionOptionDTO option = new QuestionOptionDTO();
        option.setId(row.getOptionId());
        option.setQuestionId(row.getQuestionId());
        option.setOrdering(row.getOptionOrdering());
        option.setTitle(row.getOptionTitle());
        option.setIsCorrect(row.getOptionIsCorrect());
        return option;
    }

    private Map<UUID, QuestionDTO> buildQuestionsMap(List<QuizFlatRow> rows) {
        Map<UUID, QuestionDTO> map = new LinkedHashMap<>();
        for (QuizFlatRow row : rows) {
            UUID questionId = row.getQuestionId();
            if (questionId == null) continue;
            QuestionDTO question = map.get(questionId);
            if (question == null) {
                question = buildQuestionDto(row);
                map.put(questionId, question);
            }
            if (row.getOptionId() != null) {
                question.getQuestionOptions().add(buildOptionDto(row));
            }
        }
        return map;
    }
}

