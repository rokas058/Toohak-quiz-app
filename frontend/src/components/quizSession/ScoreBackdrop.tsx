import { useTranslation } from "react-i18next";
//import {useState} from "react";
import { Backdrop, Box, Slide, Typography } from "@mui/material";

interface ScoreProps {
  score: number;
  position: number;
  correct: boolean;
}

const ScoreBackdrop = ({ score, position, correct }: ScoreProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Backdrop open={true}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Box sx={{ p: 1, "& *": { color: "white" } }}>
            <Typography variant="h3">
              {t(`Score.${correct ? "correct" : "incorrect"}`)}
            </Typography>
            <Box sx={{ p: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between " }}>
                <Typography variant="h4">{t("Score.score")}</Typography>
                <Typography variant="h4">{score}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between " }}>
                <Typography variant="h4">{t("Score.position")}</Typography>
                <Typography variant="h4">{position}</Typography>
              </Box>
            </Box>
          </Box>
        </Slide>
      </Backdrop>
    </>
  );
};

export default ScoreBackdrop;
