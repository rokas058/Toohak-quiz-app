import { createContext, Dispatch } from "react";
import { HostSessionAction, HostSessionState } from "./HostSessionProvider";

export const HostSessionContext = createContext<
  [HostSessionState, Dispatch<HostSessionAction>] | null
>(null);
