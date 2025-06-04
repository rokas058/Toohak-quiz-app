package com.sourcery.km.service.helper;

import com.nimbusds.oauth2.sdk.util.CollectionUtils;
import com.sourcery.km.entity.QuestionOption;
import com.sourcery.km.entity.Quiz;
import com.sourcery.km.exception.EntityNotFoundException;
import com.sourcery.km.repository.QuestionOptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class QuestionOptionHelper {
    private final QuestionOptionRepository questionOptionRepository;

    public void insertQuestionOptions(Quiz quiz) {
        if (CollectionUtils.isEmpty(quiz.getQuestions())) {
            return;
        }

        quiz.getQuestions().forEach(question -> {
            if (CollectionUtils.isNotEmpty(question.getQuestionOptions())) {
                question.getQuestionOptions().forEach(option -> option.setQuestionId(question.getId()));
                questionOptionRepository.insertQuestionOptions(question.getQuestionOptions());
            }
        });
    }

    public void deleteQuestionsOptionsByQuizId(UUID quizId) {
        questionOptionRepository.deleteQuestionOptionsByQuizId(quizId);
    }

    public void deleteQuestionsOptionsByQuestionId(UUID questionId) {
        questionOptionRepository.deleteQuestionOptionsByQuestionId(questionId);
    }

    public QuestionOption getQuestionOption(UUID questionOptionId) {
        return questionOptionRepository.getQuestionOptionById(questionOptionId)
               .orElseThrow(() -> new EntityNotFoundException(
                       String.format("Question option with id: %s does not exist", questionOptionId)));
    }
}
