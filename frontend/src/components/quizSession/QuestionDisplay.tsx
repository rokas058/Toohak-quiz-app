import { Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import ImageCard from "@components/common/ui/ImageCard";
import { useTranslation } from "react-i18next";

interface DisplayProps {
  questionTitle: string;
  questionNumber: number;
  questionImage: string | null;
}

const QuestionDisplay = ({
  questionTitle,
  questionNumber,
  questionImage,
}: DisplayProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Maybe instead of this display some kind of error if isMobile = true?

  return (
    <>
      {!isMobile ? (
        <>
          <Paper
            sx={{
              bgcolor: "text.secondary",
              marginBottom: "10px",
              p: "10px",
            }}
          >
            <Typography
              variant="h3"
              color="#000000"
              sx={{
                marginBottom: "10xpx",
                wordBreak: "break-word",
                fontSize: 35,
              }}
            >
              {questionTitle}
            </Typography>
          </Paper>
          {questionImage ? (
            <ImageCard id={questionImage} maxHeight="350px" />
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <Paper
            sx={{
              bgcolor: "text.secondary",
              marginBottom: "10px",
              p: "10px",
            }}
          >
            <Typography
              variant="h3"
              color="#000000"
              sx={{
                marginBottom: "10xpx",
                wordBreak: "break-word",
                fontSize: 35,
              }}
            >
              {t("QuizSession.Question", {
                number: questionNumber,
              })}
            </Typography>
          </Paper>
        </>
      )}
    </>
  );
};

export default QuestionDisplay;
