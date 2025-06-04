//💀
import { usePlayerJwt } from "@hooks/usePlayerJwt";
import usePlayerWebSocket from "@hooks/ws/usePlayerWebSocket";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import PlayerQuizSessionQuestion from "@pages/QuizSessionPage/Player/PlayerQuizSessionQuestion/PlayerQuizSessionQuestion";
import { WsEventPlayerJoined } from "@models/Response/ws/all/WsEventPlayerJoined";
import { WsEventPlayerDisconnected } from "@models/Response/ws/all/WsEventPlayerDisconnected";
import { useQuery } from "@tanstack/react-query";
import { fetchConnectedUsers } from "@api/QuizSessionApi";
import { WsEventPlayerNewQuestion } from "@models/Response/ws/player/WsEventPlayerNewQuestion";
import { WsQuestion } from "@models/Response/ws/player/WsQuestion";
import PlayerJoinedList from "./PlayerQuizSessionQuestion/PlayerJoinedList";
import { WsEventRoundEnd } from "@models/Response/ws/all/WsEventRoundEnd.ts";
import PlayerQuizSessionAnswered from "@pages/QuizSessionPage/Player/PlayerQuizSessionQuestion/PlayerQuizSessionAnswered.tsx";
import { QuizSessionStatus } from "@models/QuizSessionState";
import PlayerQuizSessionEnd from "./PlayerQuizSessionEnd/PlayerQuizSessionEnd";

export const TRANSLATION_ROOT = "QuizSession.Player";

/**
 * Main component responsible for connecting player quiz session UI and websocket connection
 */
const PlayerQuizSession = () => {
  const playerJwt = usePlayerJwt();

  const [status, setStatus] = useState(QuizSessionStatus.PENDING);
  const [players, setPlayers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<WsQuestion | null>(
    null,
  );
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [userPosition, setUserPosition] = useState(0);

  const { init, isConnected, deactivateConnection } = usePlayerWebSocket({
    onHostDisconnected: () => {},
    onPlayerJoined: (evt: WsEventPlayerJoined) => {
      if (status !== QuizSessionStatus.PENDING) return;
      setPlayers((prev) =>
        prev.includes(evt.player.nickname)
          ? prev
          : [...prev, evt.player.nickname],
      );
    },
    onPlayerDisconnected: (evt: WsEventPlayerDisconnected) => {
      if (status !== QuizSessionStatus.PENDING) return;
      setPlayers((prev) => prev.filter((p) => p !== evt.player.nickname));
    },
    onNewQuestion: (evt: WsEventPlayerNewQuestion) => {
      setCurrentQuestion(evt.question);
      setQuestionNumber((prev) => prev + 1);

      setStatus(QuizSessionStatus.ACTIVE);
      setSelectedAnswer(null);
      setCorrectAnswer(null);
    },
    onRoundEnd: (evt: WsEventRoundEnd) => {
      setStatus(QuizSessionStatus.ROUND_END);
      setCorrectAnswer(evt.answer);

      if (playerJwt) {
        const currentPlayer = evt.players.find(
          (player) => player.nickname === playerJwt.nickname,
        );

        if (currentPlayer) {
          setUserScore(currentPlayer.score);

          const sortedPlayers = [...evt.players].sort(
            (a, b) => b.score - a.score,
          );
          const position =
            sortedPlayers.findIndex(
              (player) => player.nickname === playerJwt.nickname,
            ) + 1;
          setUserPosition(position);
        }
      }
    },
    onQuizCompleted: () => {
      setStatus(QuizSessionStatus.INACTIVE);
      deactivateConnection();
    },
  });

  const { data: connectedPlayers } = useQuery<string[]>({
    queryKey: ["sessionPlayers", playerJwt?.quizSessionId],
    queryFn: () => fetchConnectedUsers(),
    enabled: !!playerJwt?.quizSessionId,
    // Make sure not to cache the data on reload
    refetchOnMount: "always",
  });

  useEffect(() => {
    if (playerJwt && status !== QuizSessionStatus.INACTIVE) {
      init(playerJwt.quizSessionId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerJwt]);

  useEffect(() => {
    if (connectedPlayers && connectedPlayers.length > 0) {
      setPlayers((prev) => [
        ...prev,
        ...connectedPlayers.filter((name) => !prev.includes(name)),
      ]);
    }
    // Init if included makes too many calls
  }, [connectedPlayers]);

  const handleDisconnect = () => {
    deactivateConnection();
    setPlayers([]);
  };

  const handleReconnect = () => {
    init(playerJwt!.quizSessionId);
  };

  const handleAnswerSubmit = (selectedAnswerId: string) => {
    setSelectedAnswer(selectedAnswerId);
  };

  return (
    <Container>
      {status === QuizSessionStatus.PENDING && (
        <PlayerJoinedList
          players={players}
          isConnected={isConnected}
          onDisconnect={handleDisconnect}
          onReconnect={handleReconnect}
        />
      )}
      {status === QuizSessionStatus.ACTIVE && (
        <PlayerQuizSessionQuestion
          question={currentQuestion!}
          questionNumber={questionNumber}
          selectedAnswer={selectedAnswer}
          onAnswerSubmit={handleAnswerSubmit}
        />
      )}

      {status === QuizSessionStatus.ROUND_END && (
        <PlayerQuizSessionAnswered
          question={currentQuestion!}
          questionNumber={questionNumber}
          correctAnswer={correctAnswer}
          userScore={userScore}
          userPosition={userPosition}
          selectedAnswer={selectedAnswer}
        />
      )}
      {status === QuizSessionStatus.INACTIVE && (
        <PlayerQuizSessionEnd
          playerCount={players.length}
          score={userScore}
          place={userPosition}
        />
      )}
    </Container>
  );
};

export default PlayerQuizSession;
