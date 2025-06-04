import { WsEventHostDisconnected } from "./WsEventHostDisconnected";
import { WsEventPlayerDisconnected } from "./WsEventPlayerDisconnected";
import { WsEventPlayerJoined } from "./WsEventPlayerJoined";
import { WsEventQuizCompleted } from "./WsEventQuizCompleted";
import { WsEventRoundEnd } from "./WsEventRoundEnd";

export enum AllEventTypes {
  PLAYER_JOINED = "player_joined",
  PLAYER_DISCONNECTED = "player_disconnected",
  HOST_DISCONNECTED = "host_disconnected",
  ROUND_END = "round_end",
  NEW_QUESTION = "new_question",
  QUIZ_COMPLETED = "quiz_completed",
}

export type WsEventAll =
  | WsEventPlayerJoined
  | WsEventPlayerDisconnected
  | WsEventHostDisconnected
  | WsEventRoundEnd
  | WsEventQuizCompleted;
