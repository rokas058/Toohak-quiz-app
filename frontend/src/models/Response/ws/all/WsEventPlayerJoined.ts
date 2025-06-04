import { WsEventGeneric } from "../WsEventGeneric";
import { AllEventTypes } from "./WsEventAll";
import { WsPlayer } from "./WsPlayer";

export interface WsEventPlayerJoined
  extends WsEventGeneric<AllEventTypes.PLAYER_JOINED> {
  player: WsPlayer;
}
