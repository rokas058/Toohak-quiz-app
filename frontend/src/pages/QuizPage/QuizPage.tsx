import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import { CARD_BACKGROUND_PURPLE } from "../../assets/styles/constants";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loader from "@components/Loader";
import ImageCard from "@components/common/ui/ImageCard";
import OptionsList from "./OptionsList";
import QuizPageSettings from "./QuizPageSettings";
import { showToast } from "@ui/Toast.tsx";
import PageNotFound from "@pages/PageNotFound.tsx";
import { useQuiz } from "@hooks/useQuiz";
import { PrivateAppRoutes } from "@models/PrivateRoutes";

const QuizPage = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { handleError } = showToast();
  const navigate = useNavigate();
  const { data: quiz, isLoading, error } = useQuiz(id);

  const handleEditButton = () => {
    const path = generatePath(PrivateAppRoutes.EDIT_QUIZ_PAGE, { id: id! });
    navigate(path);
  };

  if (isLoading) return <Loader />;
  if (error instanceof Error) {
    handleError(error, t("Error.Quiz.couldNotFind"));
    return <PageNotFound />;
  }

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          display: "flex",
          gap: theme.spacing(2),
        }}
      >
        <Typography
          variant="h3"
          title={quiz?.title}
          sx={{
            textAlign: "left",
            overflowWrap: "break-word",
            ...theme.multiLineEllipsis(1),
          }}
        >
          {quiz?.title}
        </Typography>
        <Box sx={{ display: "flex", gap: theme.spacing(1) }}>
          <Button variant="contained" onClick={handleEditButton}>
            {t("QuizPage.editButton")}
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 8 }}>
          <Stack spacing={2}>
            <Box
              sx={{
                backgroundColor: quiz?.imageId
                  ? "transparent"
                  : CARD_BACKGROUND_PURPLE,
                borderRadius: theme.borderRadius?.md,
                display: "flex",
                justifyContent: "center",
                "& .MuiCardMedia-root": {
                  maxHeight: 600,
                  maxWidth: "100%",
                  width: "auto",
                  objectFit: "contain",
                },
              }}
            >
              <ImageCard alt="Quiz cover" id={quiz!.imageId} maxWidth="100%" />
            </Box>
            <Typography
              variant="h5"
              sx={{
                textAlign: "left",
                overflowWrap: "break-word",
              }}
            >
              {quiz?.description}
            </Typography>
            <Typography
              component="span"
              variant="h5"
              sx={{ textAlign: "left" }}
            >
              {t("QuizPage.totalQuestions")} {quiz?.questions?.length}
            </Typography>
            <OptionsList questions={quiz!.questions} />
          </Stack>
        </Grid>
        <QuizPageSettings quizId={quiz?.id} />
      </Grid>
    </Stack>
  );
};

export default QuizPage;
