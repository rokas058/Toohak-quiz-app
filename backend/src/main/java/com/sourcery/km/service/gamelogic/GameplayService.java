package com.sourcery.km.service.gamelogic;

import com.sourcery.km.dto.question.QuestionDTO;
import com.sourcery.km.dto.quizSession.SessionQuestionDTO;
import com.sourcery.km.entity.*;
import com.sourcery.km.exception.EntityNotFoundException;
import com.sourcery.km.exception.QuizFinishedException;
import com.sourcery.km.repository.QuizSessionProgressRepository;
import com.sourcery.km.repository.QuizSessionQuestionOrderRepository;
import com.sourcery.km.repository.QuizSessionRepository;
import com.sourcery.km.service.MapperService;
import com.sourcery.km.service.QuestionService;
import com.sourcery.km.service.QuizService;
import com.sourcery.km.service.helper.GameplayHelper;
import com.sourcery.km.service.helper.QuizSessionHelper;
import com.sourcery.km.service.websocket.WsEventSendingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;


@Service
@Slf4j
@RequiredArgsConstructor
public class GameplayService {
    private final WsEventSendingService wsEventSendingService;

    private final QuizSessionProgressRepository progressRepository;

    private final QuizSessionQuestionOrderRepository questionOrderRepository;

    private final QuestionService questionService;

    private final QuizSessionHelper quizSessionHelper;

    private final QuizService quizService;

    private final QuizSessionRepository quizSessionRepository;

    private final GameplayHelper gameplayHelper;

    private final MapperService mapperService;

    @Transactional
    public QuizSessionProgress nextQuestion(UUID sessionId) {
        QuizSession quizSession = quizSessionHelper.getQuizSession(sessionId);
        if (quizSession == null)
            throw new EntityNotFoundException("Quiz session not found");

        UUID quizId = quizSession.getQuizId();
        Quiz quiz = quizService.getQuiz(quizId);
        quizService.isQuizCreator(quiz);

        QuizSessionQuestionOrder nextOrder = questionOrderRepository.findNextQuestion(sessionId);
        if (nextOrder == null) {
            quizSessionRepository.updateSessionStatus(sessionId, QuizStatus.INACTIVE);
            wsEventSendingService.sendQuizCompleted(sessionId);
            log.info("Quiz session {} completed - no more questions", sessionId);
            throw new QuizFinishedException("Quiz session " + sessionId + " completed - no more questions");
        }

        QuestionDTO nextQuestion = questionService.getQuestionById(nextOrder.getQuestionId());
        QuizSessionProgress currentProgress = progressRepository.findBySessionId(sessionId);
        QuizSessionProgress progress = gameplayHelper.buildQuizSessionProgress(
                nextOrder.getQuestionId(),
                sessionId,
                currentProgress.getDurationSeconds()
        );

        progressRepository.update(progress);

        sendQuestionToPlayers(sessionId, nextQuestion);
        return progress;
    }

    public void sendQuestionToPlayers(UUID sessionId, QuestionDTO questionDTO) {
        SessionQuestionDTO question = mapperService.map(questionDTO, SessionQuestionDTO.class);
        QuizSessionProgress quizProgress = progressRepository.findBySessionId(sessionId);
        question.setDurationSeconds(quizProgress.getDurationSeconds());
        wsEventSendingService.sendQuestionToPlayers(sessionId, question);
        QuizSessionProgress currentProgress = progressRepository.findBySessionId(sessionId);
        gameplayHelper.scheduleAnsweringPeriodEnd(sessionId, currentProgress);
    }
}
