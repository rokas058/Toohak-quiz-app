import { Button, Grid, Stack, Typography } from "@mui/material";
import { createQuizSession } from "@api/QuizSessionApi";
import { NewQuizSessionRequest } from "@models/Request/NewQuizSessionRequest";
import { NewQuizSessionResponse } from "@models/Response/NewQuizSessionResponse";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { PublicAppRoutes } from "@models/PublicRoutes";

type QuizPageSettingsProps = {
  quizId?: string;
};

const QuizPageSettings: React.FC<QuizPageSettingsProps> = ({ quizId }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const createQuizSessionMutation = useMutation({
    mutationFn: (req: NewQuizSessionRequest) => createQuizSession(req),
    onSuccess: (res: NewQuizSessionResponse) => {
      navigate(
        PublicAppRoutes.QUIZ_SESSION_PAGE.replace(":joinId", res.joinId),
        { state: res },
      );
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleStartClick = (id: string | undefined) => {
    if (id != undefined) {
      const requestData: NewQuizSessionRequest = {
        quizId: id,
      };
      createQuizSessionMutation.mutate(requestData);
    }
  };
  return (
    <Grid size={{ xs: 12, sm: 4 }}>
      <Stack sx={{ textAlign: "left" }} spacing={2}>
        <Typography variant="h3" gutterBottom>
          {t("QuizPage.gameSettings")}
        </Typography>
        <Typography variant="h4">{t("QuizPage.form")}</Typography>
        <Button
          variant="contained"
          onClick={() => handleStartClick(quizId)}
          color="success"
          fullWidth
        >
          {t("QuizPage.startButton")}
        </Button>
      </Stack>
    </Grid>
  );
};

export default QuizPageSettings;
