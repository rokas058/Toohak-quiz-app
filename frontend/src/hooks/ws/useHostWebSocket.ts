import { useAuth0 } from "@auth0/auth0-react";
import { useWebSocket } from "@hooks/ws/useWebSocket";
import { AllEventTypes, WsEventAll } from "@models/Response/ws/all/WsEventAll";
import { WsEventHostDisconnected } from "@models/Response/ws/all/WsEventHostDisconnected";
import { WsEventPlayerDisconnected } from "@models/Response/ws/all/WsEventPlayerDisconnected";
import { WsEventPlayerJoined } from "@models/Response/ws/all/WsEventPlayerJoined";
import { WsEventQuizCompleted } from "@models/Response/ws/all/WsEventQuizCompleted";
import { WsEventRoundEnd } from "@models/Response/ws/all/WsEventRoundEnd";
import { WsEventHost } from "@models/Response/ws/host/WsEventHost";

interface Handlers {
  onPlayerJoined: (evt: WsEventPlayerJoined) => void;
  onPlayerDisconnected: (evt: WsEventPlayerDisconnected) => void;
  onHostDisconnected: (evt: WsEventHostDisconnected) => void;
  onRoundEnd: (evt: WsEventRoundEnd) => void;
  onQuizCompleted: (evt: WsEventQuizCompleted) => void;
}

const useHostWebSocket = (handlers: Handlers) => {
  const {
    initializeWebSocketClient,
    subscribeToTopic,
    isConnected,
    messages,
    deactivateConnection,
  } = useWebSocket();
  const { getAccessTokenSilently } = useAuth0();

  const dispatchForWsAll = (event: WsEventAll) => {
    switch (event.event) {
      case AllEventTypes.PLAYER_DISCONNECTED:
        return handlers.onPlayerDisconnected(event);
      case AllEventTypes.PLAYER_JOINED:
        return handlers.onPlayerJoined(event);
      case AllEventTypes.HOST_DISCONNECTED:
        return handlers.onHostDisconnected(event);
      case AllEventTypes.ROUND_END:
        return handlers.onRoundEnd(event);
      case AllEventTypes.QUIZ_COMPLETED:
        return handlers.onQuizCompleted(event);
    }
  };

  const dispatchForWsHost = () => {};

  const subscribeToAllTopics = (sessionId: string) => {
    subscribeToTopic<WsEventAll>(
      `/topic/session/${sessionId}/all`,
      dispatchForWsAll,
    );
  };

  const subscribeToHostTopics = (sessionId: string) => {
    subscribeToTopic<WsEventHost>(
      `/topic/session/${sessionId}/host`,
      dispatchForWsHost,
    );
  };

  const init = async (sessionId: string) => {
    const token = await getAccessTokenSilently();
    return initializeWebSocketClient(
      `Bearer ${token}`,
      () => {
        subscribeToAllTopics(sessionId);
        subscribeToHostTopics(sessionId);
      },
      () => {},
    );
  };

  return { init, isConnected, messages, deactivateConnection };
};

export default useHostWebSocket;
