import {
  HostSessionActionTypes,
  HostSessionComponentEventNewQuestion,
  HostSessionComponentEvents,
} from "@models/hostSessionTypes";
import { QuizSessionStatus } from "@models/QuizSessionState";
import { QuestionResponse } from "@models/Response/questionResponse";
import { AllEventTypes } from "@models/Response/ws/all/WsEventAll";
import { WsEventPlayerDisconnected } from "@models/Response/ws/all/WsEventPlayerDisconnected";
import { WsEventPlayerJoined } from "@models/Response/ws/all/WsEventPlayerJoined";
import { WsEventRoundEnd } from "@models/Response/ws/all/WsEventRoundEnd";
import { WsPlayer } from "@models/Response/ws/all/WsPlayer";
import { useReducer } from "react";
import { HostSessionContext } from "./HostSessionContext";
import { WsEventGeneric } from "@models/Response/ws/WsEventGeneric";

export interface HostSessionState {
  questionNumber: number;
  status: QuizSessionStatus;
  currentQuestion: QuestionResponse | null;
  correctQuestionOption: string;
  newScores: WsPlayer[];
  oldScores: WsPlayer[];
}

export interface HostSessionAction {
  payload: WsEventGeneric<string> | HostSessionComponentEvents<number>;
}

const hostSessionReducer = (
  state: HostSessionState,
  action: HostSessionAction,
): HostSessionState => {
  switch (action.payload.event) {
    case HostSessionActionTypes.NEW_QUESTION: {
      const { questions } =
        action.payload as HostSessionComponentEventNewQuestion;
      return {
        ...state,
        currentQuestion: questions[state.questionNumber],
        status: QuizSessionStatus.ACTIVE,
        questionNumber: state.questionNumber + 1,
        correctQuestionOption: "",
      };
    }
  }

  switch (action.payload.event) {
    case AllEventTypes.PLAYER_JOINED: {
      const { player } = action.payload as WsEventPlayerJoined;
      if (state.status !== QuizSessionStatus.PENDING) return state;
      const setInitialScores = (playerScores: WsPlayer[]) => {
        if (
          playerScores.some(
            (currentPlayer) => currentPlayer.userId === player.userId,
          )
        )
          return playerScores;
        return [...playerScores, { ...player, score: 0 }];
      };

      return {
        ...state,
        newScores: setInitialScores(state.newScores),
        oldScores: setInitialScores(state.oldScores),
      };
    }
    case AllEventTypes.PLAYER_DISCONNECTED: {
      if (state.status !== QuizSessionStatus.PENDING) return state;

      const { player } = action.payload as WsEventPlayerDisconnected;
      const filterPlayerScores = (playerScores: WsPlayer[]) => {
        return playerScores.filter(
          (currentPlayer) => currentPlayer.userId !== player.userId,
        );
      };

      return {
        ...state,
        newScores: filterPlayerScores(state.newScores),
        oldScores: filterPlayerScores(state.oldScores),
      };
    }
    case AllEventTypes.ROUND_END: {
      const { answer, players } = action.payload as WsEventRoundEnd;

      return {
        ...state,
        status: QuizSessionStatus.ROUND_END,
        correctQuestionOption: answer,
        oldScores: state.newScores,
        newScores: players,
      };
    }
    case AllEventTypes.QUIZ_COMPLETED: {
      return {
        ...state,
        status: QuizSessionStatus.INACTIVE,
      };
    }
  }
  return state;
};

interface HostSessionContextProps extends React.PropsWithChildren {
  sessionStatus: QuizSessionStatus;
}

export const HostSessionProvider = ({
  sessionStatus,
  children,
}: HostSessionContextProps) => {
  const reducer = useReducer(hostSessionReducer, {
    questionNumber: 0,
    status: sessionStatus,
    currentQuestion: null,
    correctQuestionOption: "",
    newScores: [],
    oldScores: [],
  });

  return (
    <HostSessionContext.Provider value={reducer}>
      {children}
    </HostSessionContext.Provider>
  );
};
