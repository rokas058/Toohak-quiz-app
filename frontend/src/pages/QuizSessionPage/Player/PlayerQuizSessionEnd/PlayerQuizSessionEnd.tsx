import { Button, Stack, Typography } from "@mui/material";
import PlaceDisplay from "./PlaceDisplay";
import { useTranslation } from "react-i18next";
import { TRANSLATION_ROOT } from "../PlayerQuizSession";
import { Link } from "react-router-dom";

interface PlayerQuizSessionEndProps {
  playerCount: number;
  place: number;
  score: number;
}

const PlayerQuizSessionEnd = ({ place, score }: PlayerQuizSessionEndProps) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={8}>
      <Stack spacing={2} alignItems={"center"} flex={1}>
        <Typography variant="h4">{t(`${TRANSLATION_ROOT}.Placed`)}</Typography>
        <PlaceDisplay place={place} />
      </Stack>
      <Stack spacing={2} alignItems={"center"}>
        <Typography variant="h4">
          {t(`${TRANSLATION_ROOT}.Score`, { count: score })}
        </Typography>
        <Button component={Link} to="/" color="primary" variant="outlined">
          {t(`${TRANSLATION_ROOT}.ReturnHome`)}
        </Button>
      </Stack>
    </Stack>
  );
};

export default PlayerQuizSessionEnd;
