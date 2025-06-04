import { WsEventGeneric } from "../WsEventGeneric";
import { AllEventTypes } from "./WsEventAll";

export type WsEventQuizCompleted = WsEventGeneric<AllEventTypes.QUIZ_COMPLETED>;
