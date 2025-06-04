package com.sourcery.km.service.gamelogic;

import com.sourcery.km.entity.*;
import com.sourcery.km.exception.ConflictException;
import com.sourcery.km.repository.PlayerAnswerRepository;
import com.sourcery.km.repository.QuizSessionProgressRepository;
import com.sourcery.km.service.helper.GameplayHelper;
import com.sourcery.km.service.helper.QuestionOptionHelper;
import com.sourcery.km.service.helper.QuizSessionHelper;
import com.sourcery.km.service.websocket.WsEventSendingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlayerAnswerService {
    private final PlayerAnswerRepository playerAnswerRepository;

    private final QuestionOptionHelper questionOptionHelper;

    private final QuizPlayerService quizPlayerService;

    private final WsEventSendingService wsEventSendingService;

    private final GameplayHelper gameplayHelper;

    private final QuizSessionHelper quizSessionHelper;

    private final QuizSessionProgressRepository progressRepository;

    public void insertPlayerAnswer(PlayerAnswer playerAnswer) {
        playerAnswerRepository.insertPlayerAnswer(playerAnswer);
    }

    public boolean hasPlayerAlreadyAnsweredQuestion(UUID playerId, UUID questionId) {
        return playerAnswerRepository.existsByPlayerIdAndQuestionId(playerId, questionId);
    }


    @Transactional
    public void processPlayerAnswer(UUID questionOptionId, UUID playerId) {
        Instant answeredAt = Instant.now();
        QuizPlayer quizPlayer = quizPlayerService.getQuizPlayer(playerId);
        QuizSession quizSession = quizSessionHelper.getQuizSession(quizPlayer.getQuizSessionId());
        QuestionOption questionOption = questionOptionHelper.getQuestionOption(questionOptionId);
        QuizSessionProgress currentProgress = progressRepository.findBySessionId(quizSession.getId());

        validateQuestionIsActive(currentProgress, questionOption);
        validatePlayerHasNotAnswered(quizPlayer.getId(), questionOption.getQuestionId());

        PlayerAnswer playerAnswer = new PlayerAnswer(
                quizPlayer.getId(), questionOption.getQuestionId(), questionOption.getId());
        playerAnswer.setAnsweredAt(answeredAt);

        validateAnswerTiming(currentProgress, playerAnswer);

        if (questionOption.getIsCorrect()) {
            quizPlayerService.calculateAndSavePlayerPoints(currentProgress, playerAnswer);
        }

        insertPlayerAnswer(playerAnswer);

        wsEventSendingService.sendPlayerAnswerToHost(quizSession.getId(), quizPlayer.getNickname());
        if (haveAllSessionPlayersAnswered(quizSession.getId())) {
            gameplayHelper.endAnsweringPeriod(quizSession.getId());
        }
    }

    private void validateQuestionIsActive(QuizSessionProgress progress, QuestionOption option) {
        UUID currentQuestionId = progress.getCurrentQuestionId();
        if (!currentQuestionId.equals(option.getQuestionId())) {
            throw new ConflictException("This question is not currently active.");
        }
    }

    private void validatePlayerHasNotAnswered(UUID playerId, UUID questionId) {
        if (hasPlayerAlreadyAnsweredQuestion(playerId, questionId)) {
            throw new ConflictException("You have already answered this question.");
        }
    }

    private void validateAnswerTiming(QuizSessionProgress currentProgress, PlayerAnswer playerAnswer) {
        int secondsElapsed = (int) Duration.between(
                currentProgress.getCurrentQuestionStartedAt(),
                playerAnswer.getAnsweredAt()
        ).getSeconds();

        if (secondsElapsed < 0) {
            throw new ConflictException("Answer time is invalid (before question start).");
        }

        if (secondsElapsed > currentProgress.getDurationSeconds()) {
            throw new ConflictException("This question has expired.");
        }
    }

    private boolean haveAllSessionPlayersAnswered(UUID sessionId) {
        quizSessionHelper.getQuizSession(sessionId);

        int playerCount = quizPlayerService.getSessionPlayerCount(sessionId);
        int currentQuestionAnsweredPlayerCount =
                quizPlayerService.getSessionCurrentQuestionAnsweredPlayerCount(sessionId);

        return currentQuestionAnsweredPlayerCount == playerCount;
    }
}
