import { useHostSessionContext } from "@hooks/context/useHostSessionContext";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Podium from "../Podium/Podium";
import { QuizResponse } from "@models/Response/quizResponse";
import { useTranslation } from "react-i18next";
import { TRANSLATION_ROOT } from "../HostQuizSession";
import { Link } from "react-router-dom";

interface HostQuizSessionEndProps {
  quizData: QuizResponse;
}

const HostQuizSessionEnd = ({ quizData }: HostQuizSessionEndProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [{ newScores }] = useHostSessionContext();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: theme.spacing(2),
        }}
      >
        <Typography variant="h3" textAlign={"left"}>
          {t(`${TRANSLATION_ROOT}.QuizEndTitle`, { title: quizData.title })}
        </Typography>
        <Button
          component={Link}
          to={"/"}
          variant="contained"
          sx={{ textAlign: "left" }}
          color="error"
        >
          {t(`${TRANSLATION_ROOT}.Leave`)}
        </Button>
      </Box>
      <Box>
        <Podium
          newPoints={newScores.map((player) => ({
            id: player.userId,
            nickname: player.nickname,
            score: player.score,
          }))}
        />
      </Box>
    </>
  );
};

export default HostQuizSessionEnd;
