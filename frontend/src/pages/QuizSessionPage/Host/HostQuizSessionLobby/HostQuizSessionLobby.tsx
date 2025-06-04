import { startQuizSession } from "@api/QuizSessionApi";
import LoadingBackdrop from "@components/common/ui/LoadingBackdrop";
import { useHostSessionContext } from "@hooks/context/useHostSessionContext";
import { QuizResponse } from "@models/Response/quizResponse";
import { QuizSessionResponse } from "@models/Response/QuizSessionResponse";
import { Stack, Typography, Grid, Box, Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { useState } from "react";
import QRCode from "react-qr-code";

const TRANSLATIONS_ROOT = "QuizSession.Host";
const START_GAME_SUCCESS_STATUS = 200;

interface HostQuizSessionLobbyProps {
  sessionData: QuizSessionResponse;
  quizData: QuizResponse;
  onSuccessfulStart: (duration: number) => void;
}

/**
 * Host quiz session component that is rendered when quiz status is PENDING.
 *
 * During status PENDING, host can view the number of players joined and can start the session
 */
const HostQuizSessionLobby = ({
  sessionData,
  quizData,
  onSuccessfulStart,
}: HostQuizSessionLobbyProps) => {
  const [{ newScores }] = useHostSessionContext();

  const { mutate: startGameMutation, isPending: isGameStartPending } =
    useMutation({
      mutationFn: async () => {
        const response = await startQuizSession(sessionData.quizSessionId, {
          durationSeconds: duration,
        });
        if (response === START_GAME_SUCCESS_STATUS) onSuccessfulStart(duration);
      },
    });

  const handleStartQuiz = () => {
    if (duration < 10 || duration > 120) return;
    startGameMutation();
  };

  const joinUrl = `${window.location.origin}/join/${sessionData.joinId}`;

  const playerCount = newScores.length;

  const [duration, setDuration] = useState<number>(15);

  return (
    <>
      <Typography variant="h3" textAlign={"left"}>
        {t(`${TRANSLATIONS_ROOT}.QuizTitle`, { title: quizData.title })}
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            {t(`${TRANSLATIONS_ROOT}.ScanQRCode`)}
          </Typography>
          <Box
            sx={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid gray",
              borderRadius: "8px",
              width: "fit-content",
              marginInline: "auto",
            }}
          >
            <QRCode value={joinUrl} />
          </Box>
          <Box
            sx={{
              padding: "20px",
              marginBottom: "20px",
              textAlign: "center",
              boxShadow: 1,
              borderRadius: 1,
            }}
          >
            <Typography variant="h6">
              {t(`${TRANSLATIONS_ROOT}.JoinCodeTitle`)}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {sessionData.joinId}
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }} justifyContent={"space-between"}>
          <Stack spacing={3}>
            <Typography variant="h3">
              {t(`${TRANSLATIONS_ROOT}.PlayerCount`, { count: playerCount })}
            </Typography>
            <Box>
              <TextField
                label={t(`${TRANSLATIONS_ROOT}.DurationLabel`)}
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                sx={{
                  width: "200px",
                  mt: 5,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
                inputProps={{
                  min: 10,
                  max: 120,
                }}
                error={duration < 10 || duration > 120}
                helperText={
                  duration < 10
                    ? t(`${TRANSLATIONS_ROOT}.DurationErrorLess`)
                    : duration > 120
                      ? t(`${TRANSLATIONS_ROOT}.DurationErrorLong`)
                      : ""
                }
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                onClick={handleStartQuiz}
                color="success"
              >
                {t(`${TRANSLATIONS_ROOT}.Start`)}
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      {isGameStartPending && <LoadingBackdrop />}
    </>
  );
};

export default HostQuizSessionLobby;
