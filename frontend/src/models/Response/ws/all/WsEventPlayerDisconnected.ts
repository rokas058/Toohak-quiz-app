import { WsEventGeneric } from "../WsEventGeneric";
import { AllEventTypes } from "./WsEventAll";
import { WsPlayer } from "./WsPlayer";

export interface WsEventPlayerDisconnected
  extends WsEventGeneric<AllEventTypes.PLAYER_DISCONNECTED> {
  player: WsPlayer;
}
