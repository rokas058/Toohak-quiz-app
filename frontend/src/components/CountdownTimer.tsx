import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { alpha } from "@mui/material/styles";

type CountdownTimerProps = {
  duration: number;
  size?: number;
  onComplete?: () => void;
};

const CountdownTimer = ({
  duration,
  onComplete,
  size = 100,
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const endTimeRef = useRef<number>(Date.now() + duration * 1000);

  useEffect(() => {
    endTimeRef.current = Date.now() + duration * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const newTimeLeft = Math.max(
        0,
        Math.ceil((endTimeRef.current - now) / 1000),
      );
      setTimeLeft(newTimeLeft);

      if (newTimeLeft === 0) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 250);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  const progress = (timeLeft / duration) * 100;

  const getProgressColor = () => {
    if (progress > 60) return "#4caf50";
    if (progress > 30) return "#ff9800";
    return "#f44336";
  };

  const fadedColor = alpha(getProgressColor(), 0.3);

  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        justifyContent: "flex-start",
        width: "100%",
        mb: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          variant="determinate"
          value={100}
          size={size}
          thickness={5}
          sx={{
            color: fadedColor,
          }}
        />

        <CircularProgress
          variant="determinate"
          value={progress}
          size={size}
          thickness={5}
          sx={{
            color: getProgressColor(),
            position: "absolute",
            left: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Typography
            variant="h5"
            component="div"
            color="text.primary"
            fontWeight="bold"
          >
            {timeLeft}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CountdownTimer;
