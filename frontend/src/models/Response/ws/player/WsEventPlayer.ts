import { WsEventPlayerNewQuestion } from "./WsEventPlayerNewQuestion";

export enum PlayerEventTypes {
  NEW_QUESTION = "new_question",
}

export type WsEventPlayer = WsEventPlayerNewQuestion;
