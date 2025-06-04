package com.sourcery.km.service.websocket;

import com.sourcery.km.dto.question.QuestionDTO;
import com.sourcery.km.dto.quizPlayer.QuizPlayerDTO;
import com.sourcery.km.dto.quizPlayer.QuizPlayerWsDTO;
import com.sourcery.km.dto.quizSession.SessionQuestionDTO;
import com.sourcery.km.entity.QuestionOption;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class WsEventSendingService {
    private final SimpMessagingTemplate messagingTemplate;

    public void sendPlayerJoined(String quizSessionId, QuizPlayerDTO player) {
        messagingTemplate.convertAndSend(
                "/topic/session/" + quizSessionId + "/all",
                Map.of(
                        "event", "player_joined",
                        "player", player,
                        "timestamp", Instant.now().toString()
                )
        );
    }

    public void sendHostDisconnected(String quizSessionId) {
        messagingTemplate.convertAndSend(
                "/topic/session/" + quizSessionId + "/all",
                Map.of(
                        "event", "host_disconnected",
                        "timestamp", Instant.now().toString()
                )
        );
    }

    public void sendPlayerDisconnected(String quizSessionId, QuizPlayerDTO player) {
        messagingTemplate.convertAndSend(
                "/topic/session/" + quizSessionId + "/all",
                Map.of(
                        "event", "player_disconnected",
                        "player", player,
                        "timestamp", Instant.now().toString()
                )
        );
    }

    public void sendStartGame(UUID sessionId) {
        messagingTemplate.convertAndSend(
                "/topic/session/" + sessionId + "/players",
                Map.of("event", "game_started")
        );
    }

    public void sendQuizCompleted(UUID sessionId) {
        messagingTemplate.convertAndSend(
                "/topic/session/" + sessionId + "/all",
                Map.of("event", "quiz_completed")
        );
    }

    public void sendPlayerAnswerToHost(UUID sessionId, String nickname) {
        messagingTemplate.convertAndSend(
                "/topic/session/" + sessionId + "/host",
                Map.of("event", "player_answered", "player", nickname)
        );
    }

    public void sendQuestionToPlayers(UUID sessionId, SessionQuestionDTO questionDTO) {
        messagingTemplate.convertAndSend(
                "/topic/session/" + sessionId + "/players",
                Map.of("event", "new_question",
                        "question", questionDTO)
        );
    }

    public void sendRoundEnd(UUID sessionId, QuestionOption correctOption, List<QuizPlayerWsDTO> players) {
        messagingTemplate.convertAndSend(
                "/topic/session/" + sessionId + "/all",
                Map.of(
                        "event", "round_end",
                        "players", players,
                        "answer", correctOption.getId()
                )
        );
    }
}
