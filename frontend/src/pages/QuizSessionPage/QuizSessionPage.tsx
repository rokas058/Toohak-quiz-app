import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { findQuizSession } from "@api/QuizSessionApi";
import { PublicAppRoutes } from "@models/PublicRoutes";
import { useAuth0 } from "@auth0/auth0-react";
import PlayerQuizSession from "./Player/PlayerQuizSession";
import { usePlayerJwt } from "@hooks/usePlayerJwt";
import HostQuizSession from "./Host/HostQuizSession";
import { HostSessionProvider } from "@contexts/HostSessionProvider";

const QuizSessionPage = () => {
  const { joinId } = useParams<{ joinId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const playerJwt = usePlayerJwt();

  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["session", joinId],
    queryFn: () => findQuizSession(joinId!),
    enabled: !!joinId,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>{t("loading")}</Typography>
      </Box>
    );
  }

  if (error instanceof Error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          {t("QuizSession.JoinCodeInvalid")}
        </Typography>
        <Typography sx={{ marginBottom: "20px" }}>{error.message}</Typography>
        <Button
          variant="contained"
          onClick={() => navigate(PublicAppRoutes.JOIN_SESSION)}
        >
          {t("QuizSession.TryDifferentCode")}
        </Button>
      </Box>
    );
  }

  const auth0Id = user?.sub;
  const isSessionOwner = session?.createdBy === auth0Id;
  const isValidSessionJwt = session?.quizSessionId === playerJwt?.quizSessionId;

  if (isValidSessionJwt) {
    return <PlayerQuizSession />;
  }

  if (isSessionOwner) {
    return (
      <HostSessionProvider sessionStatus={session!.status}>
        <HostQuizSession joinId={joinId!} />
      </HostSessionProvider>
    );
  }
};

export default QuizSessionPage;
