import { WsEventGeneric } from "../WsEventGeneric";
import { PlayerEventTypes } from "./WsEventPlayer";
import { WsQuestion } from "@models/Response/ws/player/WsQuestion";

export interface WsEventPlayerNewQuestion
  extends WsEventGeneric<PlayerEventTypes.NEW_QUESTION> {
  question: WsQuestion;
}
