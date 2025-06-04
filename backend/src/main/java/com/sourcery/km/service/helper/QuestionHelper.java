package com.sourcery.km.service.helper;

import com.nimbusds.oauth2.sdk.util.CollectionUtils;
import com.sourcery.km.builder.file.FileBuilder;
import com.sourcery.km.entity.File;
import com.sourcery.km.entity.Quiz;
import com.sourcery.km.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import com.sourcery.km.repository.FileRepository;
import com.sourcery.km.entity.Question;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class QuestionHelper {
    private final QuestionRepository questionRepository;

    private final FileRepository fileRepository;

    public void insertQuestions(Quiz quiz) {
        if (CollectionUtils.isNotEmpty(quiz.getQuestions())) {
            quiz.getQuestions().forEach(question -> {
                question.setQuizId(quiz.getId());
                setQuestionImage(question);
            }
            );
            questionRepository.insertQuestions(quiz.getQuestions());
        }
    }

    public void setQuestionImage(Question question) {
        if (question.getImage() != null) {
            File file = FileBuilder.fromFileIdSetTemporary(question.getImage(), false);
            fileRepository.updateFile(file);
        }
    }

    public void deleteQuestionsByQuizId(UUID quizId) {

        questionRepository.deleteQuestionsByQuizId(quizId);
    }
}
