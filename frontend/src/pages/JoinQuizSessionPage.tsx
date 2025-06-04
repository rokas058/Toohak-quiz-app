import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { findQuizSession } from "@api/QuizSessionApi";
import { useMutation } from "@tanstack/react-query";
import { QuizSessionResponse } from "@models/Response/QuizSessionResponse";
import { PublicAppRoutes } from "@models/PublicRoutes";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import JoinCodeController from "@components/quizSession/JoinCodeController";
import { useAuth0 } from "@auth0/auth0-react";

type FormData = {
  joinId: string;
};

const JoinQuizSessionPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth0();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { joinId: "" },
  });

  const findQuizSessionMutation = useMutation({
    mutationFn: (joinId: string) => findQuizSession(joinId),
    onSuccess: (res: QuizSessionResponse) => {
      if (res.createdBy != user?.sub) {
        navigate(
          PublicAppRoutes.JOIN_SESSION_DIRECTLY.replace(":joinId", res.joinId),
        );
      } else {
        setError("joinId", {
          type: "manual",
          message: t("QuizSession.OwnSessionJoin"),
        });
      }
    },
    onError: () => {
      setError("joinId", {
        type: "manual",
        message: t("QuizSession.JoinCodeInvalid"),
      });
    },
  });

  const onSubmit = (data: FormData) => {
    findQuizSessionMutation.mutate(data.joinId);
  };

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
        {t("QuizSession.EnterJoinCode")}
      </Typography>

      <JoinCodeController control={control} error={errors.joinId} />

      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        {t("QuizSession.Join")}
      </Button>
    </Box>
  );
};

export default JoinQuizSessionPage;
