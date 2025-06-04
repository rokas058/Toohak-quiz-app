import { WsEventGeneric } from "../WsEventGeneric";
import { AllEventTypes } from "./WsEventAll";

// Added because its complaining about being the same as WsEventGeneric
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WsEventHostDisconnected
  extends WsEventGeneric<AllEventTypes.HOST_DISCONNECTED> {}
