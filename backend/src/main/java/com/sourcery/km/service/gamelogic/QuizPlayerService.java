package com.sourcery.km.service.gamelogic;

import com.sourcery.km.dto.quizPlayer.QuizPlayerDTO;
import com.sourcery.km.dto.quizSession.JoinSessionRequestDTO;
import com.sourcery.km.entity.PlayerAnswer;
import com.sourcery.km.entity.QuizPlayer;
import com.sourcery.km.entity.QuizSessionProgress;
import com.sourcery.km.exception.EntityNotFoundException;
import com.sourcery.km.repository.QuizPlayerRepository;
import com.sourcery.km.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizPlayerService {

    private static final int MAX_POINTS = 100;

    private final QuizPlayerRepository quizPlayerRepository;

    private final JwtService jwtService;

    public QuizPlayer getQuizPlayer(UUID quizPlayerId) {
        return quizPlayerRepository.getPlayerById(quizPlayerId)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("Quiz player with id: %s does not exist", quizPlayerId)));
    }

    public void insertQuizPlayer(QuizPlayer quizPlayer) {
        quizPlayerRepository.insertNewPlayer(quizPlayer);
    }

    public void calculateAndSavePlayerPoints(QuizSessionProgress currentProgress, PlayerAnswer playerAnswer) {
        int points = calculatePlayerPoints(currentProgress, playerAnswer);
        savePlayerPoints(playerAnswer.getQuizPlayerId(), points);
    }

    public int calculatePlayerPoints(QuizSessionProgress currentProgress, PlayerAnswer playerAnswer) {
        int maxTime = currentProgress.getDurationSeconds();

        long secondsElapsed = Duration.between(
                currentProgress.getCurrentQuestionStartedAt(),
                playerAnswer.getAnsweredAt()
        ).getSeconds();

        double points = MAX_POINTS - (secondsElapsed * (MAX_POINTS / (double) maxTime));

        return (int) Math.max(0, Math.round(points));
    }

    private void savePlayerPoints(UUID playerId, int points) {
        QuizPlayer player = getQuizPlayer(playerId);
        player.setScore(player.getScore() + points);
        quizPlayerRepository.updatePlayerScore(player);
    }

    public int getSessionPlayerCount(UUID quizSessionId) {
        return quizPlayerRepository.getSessionPlayerCount(quizSessionId)
                .getCount();
    }

    public int getSessionCurrentQuestionAnsweredPlayerCount(UUID quizSessionId) {
        return quizPlayerRepository.getSessionPlayerAnsweredCount(quizSessionId)
                .getCount();
    }

    public List<String> getConnectedUsers() {
        QuizPlayerDTO user = jwtService.getAnonymousUserInfo();
        return quizPlayerRepository.getSessionPlayerNicknames(user.getQuizSessionId());
    }

    public boolean ifNicknameExist(JoinSessionRequestDTO joinSessionRequestDTO) {
        return quizPlayerRepository.existsByQuizSessionIdAndNickname(joinSessionRequestDTO);
    }
}
