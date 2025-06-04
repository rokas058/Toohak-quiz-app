package com.sourcery.km.service.helper;

import com.sourcery.km.dto.question.QuestionDTO;
import com.sourcery.km.dto.quizPlayer.QuizPlayerWsDTO;
import com.sourcery.km.dto.quizSession.StartSessionDTO;
import com.sourcery.km.entity.QuestionOption;
import com.sourcery.km.entity.QuizPlayer;
import com.sourcery.km.entity.QuizSessionProgress;
import com.sourcery.km.entity.QuizSessionQuestionOrder;
import com.sourcery.km.repository.QuizPlayerRepository;
import com.sourcery.km.repository.QuizSessionProgressRepository;
import com.sourcery.km.repository.QuizSessionQuestionOrderRepository;
import com.sourcery.km.service.MapperService;
import com.sourcery.km.service.QuestionService;
import com.sourcery.km.service.websocket.WsEventSendingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class GameplayHelper {
    private final QuizSessionQuestionOrderRepository questionOrderRepository;

    private final QuizSessionProgressRepository progressRepository;

    private final ScheduledExecutorService scheduler;

    private final QuizPlayerRepository quizPlayerRepository;

    private final QuestionService questionService;

    private final WsEventSendingService wsEventSendingService;

    private final MapperService mapperService;

    public QuizSessionProgress buildQuizSessionProgress(UUID questionId, UUID sessionId, int durationSeconds) {
        return QuizSessionProgress.builder()
                .sessionId(sessionId)
                .currentQuestionId(questionId)
                .currentQuestionStartedAt(Instant.now())
                .durationSeconds(durationSeconds)
                .build();
    }

    public void initializeQuestionOrder(UUID sessionId, List<QuestionDTO> questions) {
        List<QuizSessionQuestionOrder> orderRecords = new ArrayList<>();
        int questionOrder = 0;
        for (QuestionDTO question : questions) {
            orderRecords.add(QuizSessionQuestionOrder.builder()
                    .sessionId(sessionId)
                    .questionId(question.getId())
                    .questionOrder(questionOrder++)
                    .isCompleted(false)
                    .build());
        }
        questionOrderRepository.batchInsert(orderRecords);
    }

    public void initializeSessionProgress(UUID sessionId, UUID firstQuestionId, int durationSeconds) {
        QuizSessionProgress progress = QuizSessionProgress.builder()
                .sessionId(sessionId)
                .currentQuestionId(firstQuestionId)
                .currentQuestionStartedAt(Instant.now())
                .durationSeconds(durationSeconds)
                .build();
        progressRepository.insert(progress);
    }

    @Transactional
    public void scheduleAnsweringPeriodEnd(UUID sessionId, QuizSessionProgress currentProgress) {
        scheduler.schedule(() -> {
            QuizSessionProgress schedulerProgress = progressRepository.findBySessionId(sessionId);

            boolean isCurrentQuestionComplete =
                    questionOrderRepository.findIsQuestionComplete(
                            schedulerProgress.getSessionId(),
                            schedulerProgress.getCurrentQuestionId()
                    );

            boolean isAlreadyNextQuestion = !schedulerProgress.getCurrentQuestionId()
                    .equals(currentProgress.getCurrentQuestionId());

            if (isAlreadyNextQuestion || isCurrentQuestionComplete)
                return;

            endAnsweringPeriod(schedulerProgress.getSessionId());
        }, currentProgress.getDurationSeconds(), TimeUnit.SECONDS);
    }

    @Transactional
    public void endAnsweringPeriod(UUID sessionId) {
        QuizSessionProgress currentProgress = progressRepository.findBySessionId(sessionId);

        questionOrderRepository.markQuestionCompleted(sessionId, currentProgress.getCurrentQuestionId());

        List<QuizPlayer> players = quizPlayerRepository.getSessionPlayers(sessionId);
        List<QuizPlayerWsDTO> wsPlayers = mapperService.mapList(players, QuizPlayerWsDTO.class);
        QuestionOption correctOption = questionService.getCorrectQuestionOption(
                currentProgress.getCurrentQuestionId()
        );
        wsEventSendingService.sendRoundEnd(sessionId, correctOption, wsPlayers);
    }
}
