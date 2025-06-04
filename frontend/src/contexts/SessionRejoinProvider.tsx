import React, { useState, useEffect, useCallback, useMemo } from "react";
import Cookies from "universal-cookie";
import { getSessionCode } from "@api/QuizSessionApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { SessionRejoinContext } from "./SessionRejoinContext";

export const SessionRejoinProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth0();
  const cookies = useMemo(() => new Cookies(), []);
  const location = useLocation();
  const [rejoinCode, setRejoinCode] = useState<string | null>(null);

  const fetchRejoinCode = useCallback(async () => {
    try {
      const code = await getSessionCode();
      setRejoinCode(code);
      return code;
    } catch {
      cookies.remove("QuizSessionJwt");
      setRejoinCode(null);
      return null;
    }
  }, [cookies]);

  useEffect(() => {
    if (!isAuthenticated && cookies.get("QuizSessionJwt")) {
      fetchRejoinCode();
    } else {
      setRejoinCode(null);
    }
  }, [isAuthenticated, cookies, fetchRejoinCode, location.pathname]);

  return (
    <SessionRejoinContext.Provider
      value={{
        rejoinCode,
        refreshRejoinCode: fetchRejoinCode,
      }}
    >
      {children}
    </SessionRejoinContext.Provider>
  );
};
