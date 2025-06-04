package com.sourcery.km.service.helper;

import com.sourcery.km.dto.question.QuestionDTO;
import com.sourcery.km.entity.Quiz;
import com.sourcery.km.entity.QuizSession;
import com.sourcery.km.exception.EntityNotFoundException;
import com.sourcery.km.repository.QuizSessionRepository;
import com.sourcery.km.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class QuizSessionHelper {
    private final QuizSessionRepository quizSessionRepository;

    private final QuizService quizService;

    public String createJoinId() {
        final int JOIN_CODE_LENGTH = 5;
        String joinId;
        do {
            joinId = RandomStringUtils.insecure().nextAlphabetic(JOIN_CODE_LENGTH).toUpperCase();
        } while (quizSessionRepository.findSessionByJoinId(joinId) != null);
        return joinId;
    }

    public QuizSession getQuizSession(UUID quizSessionId) {
        return quizSessionRepository.findSessionById(quizSessionId)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("Quiz session with id: %s does not exist", quizSessionId)));
    }

    public QuizSession validateSessionAndQuiz(UUID sessionId) {
        QuizSession quizSession = getQuizSession(sessionId);
        if (quizSession == null)
            throw new EntityNotFoundException("Quiz session not found");

        Quiz quiz = quizService.getQuiz(quizSession.getQuizId());
        quizService.isQuizCreator(quiz);

        return quizSession;
    }

    public List<QuestionDTO> prepareQuestions(QuizSession quizSession) {
        List<QuestionDTO> questions = quizService.getQuizById(quizSession.getQuizId()).getQuestions();
        if (questions.isEmpty()) {
            throw new EntityNotFoundException("Quiz has no questions");
        }

        if (quizSession.isShuffled()) {
            Collections.shuffle(questions);
        }

        return questions;
    }
}
