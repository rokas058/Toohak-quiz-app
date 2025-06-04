import LoadingBackdrop from "@components/common/ui/LoadingBackdrop";
import { useQuiz } from "@hooks/useQuiz";
import useHostWebSocket from "@hooks/ws/useHostWebSocket";
import { QuizSessionStatus } from "@models/QuizSessionState";
import { QuizSessionResponse } from "@models/Response/QuizSessionResponse";
import { Box, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import HostQuizSessionLobby from "./HostQuizSessionLobby/HostQuizSessionLobby";
import HostQuizSessionQuestion from "@pages/QuizSessionPage/Host/HostQuizSessionQuestion/HostQuizSessionQuestion";
import MusicBar from "@components/MusicBar";
import HostQuizSessionAnswered from "./HostQuizSessionAnswered/HostQuizSessionAnswered";
import { WsEventRoundEnd } from "@models/Response/ws/all/WsEventRoundEnd";
import { WsEventPlayerJoined } from "@models/Response/ws/all/WsEventPlayerJoined";
import { WsEventPlayerDisconnected } from "@models/Response/ws/all/WsEventPlayerDisconnected";
import { HostSessionActionTypes } from "@models/hostSessionTypes";
import { useHostSessionContext } from "@hooks/context/useHostSessionContext";
import { HostSessionComponentEventNewQuestion } from "@models/hostSessionTypes";
import HostQuizSessionEnd from "./HostQuizSessionEnd/HostQuizSessionEnd";
import { WsEventQuizCompleted } from "@models/Response/ws/all/WsEventQuizCompleted";

interface HostQuizSessionProps {
  joinId: string;
}

export const TRANSLATION_ROOT = "QuizSession.Host";

/**
 * Main component responsible for creating websocket connection for a host to quiz session and handling session status(state) logic
 */
const HostQuizSession = ({ joinId }: HostQuizSessionProps) => {
  const [{ status }, dispatch] = useHostSessionContext();
  const { init, isConnected, deactivateConnection } = useHostWebSocket({
    onHostDisconnected: () => deactivateConnection(),
    onPlayerJoined: (event: WsEventPlayerJoined) => {
      dispatch({ payload: event });
    },
    onPlayerDisconnected: (event: WsEventPlayerDisconnected) => {
      dispatch({ payload: event });
    },
    onRoundEnd: (event: WsEventRoundEnd) => {
      dispatch({ payload: event });
    },
    onQuizCompleted: (event: WsEventQuizCompleted) => {
      dispatch({ payload: event });
      deactivateConnection();
    },
  });

  const qc = useQueryClient();
  //get from cache with an assumption that QuizSessionPage fetches session data
  const session = qc.getQueryData<QuizSessionResponse>(["session", joinId])!;
  const { data: quizData, isLoading: isQuizLoading } = useQuiz(session.quizId);
  const [timerDuration, setTimerDuration] = useState<number>(15);

  useEffect(() => {
    if (status !== QuizSessionStatus.INACTIVE) init(session.quizSessionId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.quizSessionId]);

  if (isQuizLoading && !isConnected) {
    return <LoadingBackdrop />;
  }

  const handleNewQuestion = (duration: number) => {
    setTimerDuration(duration);
    dispatch({
      payload: {
        questions: quizData!.questions,
        event: HostSessionActionTypes.NEW_QUESTION,
      } as HostSessionComponentEventNewQuestion,
    });
  };

  return (
    <Stack spacing={2}>
      {status != QuizSessionStatus.INACTIVE && (
        <Box width="100%" display="flex" justifyContent="end">
          <MusicBar />
        </Box>
      )}
      {status === QuizSessionStatus.PENDING && (
        <HostQuizSessionLobby
          sessionData={session}
          quizData={quizData!}
          onSuccessfulStart={handleNewQuestion}
        />
      )}

      {status == QuizSessionStatus.ACTIVE && (
        <HostQuizSessionQuestion duration={timerDuration} />
      )}
      {status == QuizSessionStatus.ROUND_END && (
        <HostQuizSessionAnswered
          sessionId={session.quizSessionId}
          numberOfQuestions={quizData!.questions.length}
          onNextQuestionSuccess={handleNewQuestion}
        />
      )}
      {status == QuizSessionStatus.INACTIVE && (
        <HostQuizSessionEnd quizData={quizData!} />
      )}
    </Stack>
  );
};

export default HostQuizSession;
