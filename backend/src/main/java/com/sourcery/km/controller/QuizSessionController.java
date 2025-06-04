package com.sourcery.km.controller;

import com.sourcery.km.dto.quizPlayer.QuizPlayerDTO;
import com.sourcery.km.dto.quizSession.*;
import com.sourcery.km.entity.QuizSessionProgress;
import com.sourcery.km.service.JwtService;
import com.sourcery.km.service.QuizSessionService;
import com.sourcery.km.service.gamelogic.GameplayService;
import com.sourcery.km.service.gamelogic.PlayerAnswerService;
import com.sourcery.km.service.gamelogic.QuizPlayerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * The session goes as following:
 * 1. /create - Quiz owner creates a session.
 * 2. /find/{joinId} - People join using QR code or in website. Finds if the session is valid.
 * 3. /join - The person puts in the nickname and presses join. Receives a JWT.
 * 4. /start - Session owner starts the session and questions begin.
 */
@RestController
@RequestMapping("/sessions")
@RequiredArgsConstructor
public class QuizSessionController {
    private final QuizSessionService quizSessionService;

    private final JwtService jwtService;

    private final GameplayService gameplayService;

    private final QuizPlayerService quizPlayerService;

    private final PlayerAnswerService playerAnswerService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    public QuizSessionDTO create(@RequestBody CreateSessionDTO quiz) {
        return quizSessionService.createNewSession(quiz);
    }

    @GetMapping("/find/{joinId}")
    public QuizSessionDTO find(@PathVariable String joinId) {
        return quizSessionService.getQuizSession(joinId);
    }

    @PostMapping("/join")
    public JoinSessionDTO registerAnonymousUser(@Valid @RequestBody JoinSessionRequestDTO request) {
        QuizPlayerDTO anonymousUser = quizSessionService.joinSession(request);
        return jwtService.createNewSession(anonymousUser);
    }

    @PostMapping("{sessionId}/start")
    public void start(@PathVariable UUID sessionId, @RequestBody StartSessionDTO request) {
        quizSessionService.startSession(sessionId, request);
    }

    @PostMapping("{sessionId}/nextQuestion")
    public QuizSessionProgress next(@PathVariable UUID sessionId) {
        return gameplayService.nextQuestion(sessionId);
    }

    @PostMapping("/answer/{questionOptionId}")
    public void answer(@PathVariable UUID questionOptionId) {
        UUID playerId = jwtService.getPlayerId();
        playerAnswerService.processPlayerAnswer(questionOptionId, playerId);
    }

    @GetMapping("/users")
    public List<String> getAllConnectedUsers() {
        return quizPlayerService.getConnectedUsers();
    }

    @GetMapping("/code")
    public String getSessionCode() {
        return quizSessionService.getSessionCode();
    }
}
