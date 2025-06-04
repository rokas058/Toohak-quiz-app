import { WsEventGeneric } from "../WsEventGeneric";
import { AllEventTypes } from "./WsEventAll";
import { WsPlayer } from "./WsPlayer";

export interface WsEventRoundEnd
  extends WsEventGeneric<AllEventTypes.ROUND_END> {
  players: WsPlayer[];
  answer: string;
}
