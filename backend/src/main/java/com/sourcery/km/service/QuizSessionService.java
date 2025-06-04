package com.sourcery.km.service;

import com.sourcery.km.builder.quiz_player.QuizPlayerBuilder;
import com.sourcery.km.builder.quiz_session.QuizSessionBuilder;
import com.sourcery.km.dto.question.QuestionDTO;
import com.sourcery.km.dto.quizPlayer.QuizPlayerDTO;
import com.sourcery.km.dto.quizSession.*;
import com.sourcery.km.entity.*;
import com.sourcery.km.exception.BadRequestException;
import com.sourcery.km.exception.ConflictException;
import com.sourcery.km.exception.EntityNotFoundException;
import com.sourcery.km.exception.ResourceGoneException;
import com.sourcery.km.repository.QuizSessionRepository;
import com.sourcery.km.service.gamelogic.GameplayService;
import com.sourcery.km.service.gamelogic.QuizPlayerService;
import com.sourcery.km.service.helper.GameplayHelper;
import com.sourcery.km.service.helper.QuizSessionHelper;
import com.sourcery.km.service.websocket.WsEventSendingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizSessionService {
    private final QuizService quizService;

    private final QuizSessionRepository quizSessionRepository;

    private final MapperService mapperService;

    private final QuizPlayerService quizPlayerService;

    private final WsEventSendingService wsEventSendingService;

    private final GameplayService gameplayService;

    private final QuizSessionHelper quizSessionHelper;

    private final GameplayHelper gameplayHelper;

    private final JwtService jwtService;

    public QuizSessionDTO createNewSession(CreateSessionDTO createSessionDTO) {
        UUID quizId = createSessionDTO.getQuizId();
        Quiz quiz = quizService.getQuiz(quizId);
        if (quiz == null) {
            throw new EntityNotFoundException("Quiz not found");
        }
        quizService.isQuizCreator(quiz);
        validateIfQuizHasQuestions(quiz);
        QuizSession quizSession = QuizSessionBuilder.createQuizSession(quizId, quizSessionHelper.createJoinId(),
                createSessionDTO.isShuffled());
        quizSessionRepository.insertNewSession(quizSession);
        return mapperService.map(quizSession, QuizSessionDTO.class);
    }

    public QuizSessionDTO getQuizSession(String joinId) {
        QuizSessionWithOwner session = quizSessionRepository.findSessionByJoinId(joinId);
        if (session == null) {
            throw new EntityNotFoundException("Quiz session not found");
        }
        return mapperService.map(session, QuizSessionDTO.class);
    }

    public QuizPlayerDTO joinSession(JoinSessionRequestDTO joinSessionRequestDTO) {
        validateIfNicknameExist(joinSessionRequestDTO);
        QuizPlayer quizPlayer = QuizPlayerBuilder.createQuizPlayer(joinSessionRequestDTO);
        quizPlayerService.insertQuizPlayer(quizPlayer);

        return mapperService.map(quizPlayer, QuizPlayerDTO.class);
    }

    @Transactional
    public void startSession(UUID sessionId, StartSessionDTO startSessionDTO) {
        QuizSession quizSession = quizSessionHelper.validateSessionAndQuiz(sessionId);
        List<QuestionDTO> questions = quizSessionHelper.prepareQuestions(quizSession);
        gameplayHelper.initializeQuestionOrder(sessionId, questions);
        gameplayHelper.initializeSessionProgress(
                sessionId,
                questions.getFirst().getId(),
                startSessionDTO.getDurationSeconds()
        );
        quizSessionRepository.updateSessionStatus(sessionId, QuizStatus.ACTIVE);
        wsEventSendingService.sendStartGame(sessionId);
        gameplayService.sendQuestionToPlayers(sessionId, questions.getFirst());
    }

    public String getSessionCode() {
        QuizPlayerDTO playerDTO = jwtService.getAnonymousUserInfo();
        QuizSession session = quizSessionRepository.findSessionById(playerDTO.getQuizSessionId())
                .orElseThrow(() -> new EntityNotFoundException("Quiz session not found"));

        if (session.getStatus() == QuizStatus.PENDING)
            return session.getJoinId();
        else
            throw new ResourceGoneException("Quiz session is closed");
    }

    private void validateIfQuizHasQuestions(Quiz quiz) {
        if (!quiz.hasQuestions()) {
            throw new BadRequestException("Quiz must contain at least one question");
        }
    }

    private void validateIfNicknameExist(JoinSessionRequestDTO joinSessionRequestDTO) {
        if (quizPlayerService.ifNicknameExist(joinSessionRequestDTO)) {
            throw new ConflictException("Nickname is already taken in this session");
        }
    }
}
