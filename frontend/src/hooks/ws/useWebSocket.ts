import { useEffect, useRef, useState } from "react";
import {
  Client,
  IMessage,
  StompHeaders,
  StompSubscription,
} from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WS_CONFIG = {
  url: import.meta.env.VITE_WS_CONFIG_URL,
  reconnectDelay: import.meta.env.VITE_WS_CONFIG_RECONNECTION_DELAY,
};

export const useWebSocket = () => {
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionsRef = useRef<Map<string, StompSubscription>>(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    return () => deactivateConnection();
  }, []);

  const initializeWebSocketClient = (
    authorizationHeader: string,
    onConnect: () => void,
    onDisconnect: () => void,
  ) => {
    if (stompClientRef.current?.active) {
      console.warn(
        "WebSocket connection is already established. Deactivate to create a new connection",
      );
      return;
    }

    const socket = new SockJS(WS_CONFIG.url);
    const stompHeaders = new StompHeaders();

    if (authorizationHeader)
      stompHeaders["Authorization"] = authorizationHeader;
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: WS_CONFIG.reconnectDelay,
      onConnect: () => {
        setIsConnected(true);
        onConnect();
        console.log("Connected to WebSocket");
      },
      onDisconnect: () => {
        setIsConnected(false);
        onDisconnect();
        console.log("Disconnected from WebSocket");
      },
      onWebSocketError: () => {
        setIsConnected(false);
        console.log("WebSocketError");
      },
      onStompError: () => {
        setIsConnected(false);
        console.log("StompError");
      },
      onWebSocketClose: () => {
        setIsConnected(false);
        console.log("WebSocketClose");
      },
      connectHeaders: stompHeaders,
    });

    stompClient.activate();
    stompClientRef.current = stompClient;
  };

  const deactivateConnection = () => {
    if (!stompClientRef.current?.active) {
      console.warn("Cannot deactivate on absent connection");
      return;
    }
    try {
      stompClientRef.current.deactivate();
    } catch (e) {
      console.error(e);
    } finally {
      stompClientRef.current = null;
    }
  };

  /**
   * Subscribes to a certain topic.
   * @param {string} brokerPath - Receive messages from this message broker path. `brokerPath` should follow this format - `/topic/lobby/`. The client will listen to this broker for messages.
   * @param {string} handleMessageCallback - this will be callbacked when a message is received
   */
  const subscribeToTopic = <EventResponse>(
    brokerPath: string,
    handleMessageCallback: (eventResponse: EventResponse) => void,
  ) => {
    if (!stompClientRef.current?.connected) return;

    const subscription = subscriptionsRef.current.get(brokerPath);

    if (subscription) {
      subscription.unsubscribe();
    }

    const newSubscription = stompClientRef.current.subscribe(
      brokerPath,
      (message: IMessage) => {
        setMessages((prev) => [...prev, message]);
        const eventResponse = JSON.parse(message.body);
        handleMessageCallback(eventResponse);
      },
    );

    subscriptionsRef.current.set(brokerPath, newSubscription);
  };

  const unsubscribeTopic = (brokerUrl: string) => {
    if (!stompClientRef.current?.connected) return;

    const subscription = subscriptionsRef.current.get(brokerUrl);

    if (subscription) subscription.unsubscribe();
  };

  /**
   * Send message to a certain .
   * @param {string} destinationPath - this path which BE listens to for messages from client. Example value - `/app/answer`
   * @param {string} payload - this is the payload that will be sent as a message to the appropriate message endpoint
   */
  const sendMessage = (
    destinationPath: string,
    payload: { [key: string]: string },
  ) => {
    if (!stompClientRef.current?.connected) return;

    stompClientRef.current.publish({
      destination: destinationPath,
      body: JSON.stringify(payload),
    });
  };

  return {
    initializeWebSocketClient,
    subscribeToTopic,
    unsubscribeTopic,
    sendMessage,
    isConnected,
    deactivateConnection,
    messages,
  };
};
