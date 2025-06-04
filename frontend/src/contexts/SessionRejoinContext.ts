import { createContext, useContext } from "react";

export interface SessionRejoinContextValue {
  rejoinCode: string | null;
  refreshRejoinCode: () => Promise<string | null>;
}

export const SessionRejoinContext = createContext<SessionRejoinContextValue>({
  rejoinCode: null,
  refreshRejoinCode: async () => null,
});

export function useSessionRejoin(): SessionRejoinContextValue {
  const ctx = useContext(SessionRejoinContext);
  if (!ctx) {
    throw new Error("useSessionRejoin must be inside a SessionRejoinProvider");
  }
  return ctx;
}
