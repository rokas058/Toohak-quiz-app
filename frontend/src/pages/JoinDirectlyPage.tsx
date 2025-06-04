import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, InputAdornment } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { findQuizSession, joinQuizSession } from "@api/QuizSessionApi";
import { PublicAppRoutes } from "@models/PublicRoutes";
import WhiteTextField from "@components/common/ui/WhiteTextField";
import { useState } from "react";
import { JoinQuizSessionRequest } from "@models/Request/JoinQuizSessionRequest";
import { JwtResponse } from "@models/Response/JwtResponse";
import { Cookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { showToast } from "@components/common/ui/Toast";

const JoinDirectlyPage = () => {
  const { joinId } = useParams<{ joinId: string }>();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const cookies = new Cookies();
  const { t } = useTranslation();
  const { showError } = showToast();

  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["session", joinId],
    queryFn: () => findQuizSession(joinId!),
    enabled: !!joinId,
  });

  const joinQuizSessionMutation = useMutation({
    mutationFn: (req: JoinQuizSessionRequest) => joinQuizSession(req),
    onSuccess: (res: JwtResponse) => {
      if (session?.joinId) {
        cookies.set("QuizSessionJwt", res.accessToken);
        navigate(
          PublicAppRoutes.QUIZ_SESSION_PAGE.replace(":joinId", session?.joinId),
        );
      }
    },
    onError: (error) => {
      if (error.message.includes("409"))
        showError(t("QuizSession.NicknameDuplicateError"));
      console.error(error);
    },
  });

  const handleOnClick = () => {
    if (!nickname.trim()) {
      showError(t("QuizSession.NicknameEmptyError"));
      return;
    }

    if (session?.quizSessionId != undefined) {
      const req: JoinQuizSessionRequest = {
        quizSessionId: session?.quizSessionId,
        nickname: nickname,
      };
      joinQuizSessionMutation.mutate(req);
    }
  };

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        {t("QuizSession.EnterNickname")}
      </Typography>
      <WhiteTextField
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder={t("QuizSession.NicknamePlaceholder")}
        slotProps={{ htmlInput: { maxLength: 20 } }}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography variant="body2" sx={{ color: "gray" }}>
                {nickname.length}/20
              </Typography>
            </InputAdornment>
          ),
        }}
        sx={{ marginBottom: "20px", width: "300px" }}
      />
      <Button variant="contained" onClick={handleOnClick}>
        {t("QuizSession.Enter")}
      </Button>
    </Box>
  );
};

export default JoinDirectlyPage;
