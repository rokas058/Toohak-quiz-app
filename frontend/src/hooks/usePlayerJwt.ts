import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { decodeToken } from "react-jwt";
import { PlayerJwtInfo } from "@models/PlayerJwtInfo";

export const usePlayerJwt = (): PlayerJwtInfo | null => {
  const [springJwt, setSpringJwt] = useState<PlayerJwtInfo | null>(null);

  useEffect(() => {
    const cookies = new Cookies();
    const raw = cookies.get("QuizSessionJwt");
    if (!raw) return;

    const decoded = decodeToken<PlayerJwtInfo>(raw);
    if (decoded) {
      setSpringJwt(decoded);
    } else {
      console.error("Invalid or expired QuizSessionJwt");
    }
  }, []);

  return springJwt;
};
