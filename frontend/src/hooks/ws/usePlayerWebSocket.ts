import { useWebSocket } from "@hooks/ws/useWebSocket";
import { AllEventTypes, WsEventAll } from "@models/Response/ws/all/WsEventAll";
import { WsEventHostDisconnected } from "@models/Response/ws/all/WsEventHostDisconnected";
import { WsEventPlayerDisconnected } from "@models/Response/ws/all/WsEventPlayerDisconnected";
import { WsEventPlayerJoined } from "@models/Response/ws/all/WsEventPlayerJoined";
import {
  PlayerEventTypes,
  WsEventPlayer,
} from "@models/Response/ws/player/WsEventPlayer";
import { WsEventPlayerNewQuestion } from "@models/Response/ws/player/WsEventPlayerNewQuestion";
import { Cookies } from "react-cookie";
import { WsEventRoundEnd } from "@models/Response/ws/all/WsEventRoundEnd.ts";
import { WsEventQuizCompleted } from "@models/Response/ws/all/WsEventQuizCompleted";

interface Handlers {
  onPlayerJoined: (evt: WsEventPlayerJoined) => void;
  onPlayerDisconnected: (evt: WsEventPlayerDisconnected) => void;
  onHostDisconnected: (evt: WsEventHostDisconnected) => void;
  onNewQuestion: (evt: WsEventPlayerNewQuestion) => void;
  onRoundEnd: (evt: WsEventRoundEnd) => void;
  onQuizCompleted: (evt: WsEventQuizCompleted) => void;
}

const usePlayerWebSocket = (handlers: Handlers) => {
  const {
    initializeWebSocketClient,
    subscribeToTopic,
    isConnected,
    messages,
    deactivateConnection,
  } = useWebSocket();

  const dispatchForWsAll = (event: WsEventAll) => {
    switch (event.event) {
      case AllEventTypes.PLAYER_JOINED:
        return handlers.onPlayerJoined(event);
      case AllEventTypes.PLAYER_DISCONNECTED:
        return handlers.onPlayerDisconnected(event);
      case AllEventTypes.HOST_DISCONNECTED:
        return handlers.onHostDisconnected(event);
      case AllEventTypes.ROUND_END:
        return handlers.onRoundEnd(event);
      case AllEventTypes.QUIZ_COMPLETED:
        return handlers.onQuizCompleted(event);
    }
  };

  const dispatchForWsPlayer = (event: WsEventPlayer) => {
    switch (event.event) {
      case PlayerEventTypes.NEW_QUESTION:
        return handlers.onNewQuestion(event);
    }
  };

  const subscribeToAllTopics = (sessionId: string) => {
    subscribeToTopic<WsEventAll>(
      `/topic/session/${sessionId}/all`,
      dispatchForWsAll,
    );
  };

  const subscribeToPlayerTopics = (sessionId: string) => {
    subscribeToTopic<WsEventPlayer>(
      `/topic/session/${sessionId}/players`,
      dispatchForWsPlayer,
    );
  };

  const init = async (sessionId: string) => {
    const cookies = new Cookies();
    const authorizationHeader = cookies.get("QuizSessionJwt");
    return initializeWebSocketClient(
      `Bearer ${authorizationHeader}`,
      () => {
        subscribeToAllTopics(sessionId);
        subscribeToPlayerTopics(sessionId);
      },
      () => {},
    );
  };

  return {
    init,
    isConnected,
    messages,
    deactivateConnection,
  };
};

export default usePlayerWebSocket;
