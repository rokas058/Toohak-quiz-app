import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TRANSLATION_ROOT } from "../PlayerQuizSession";
import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import PlaceIcon from "@components/common/ui/PlaceIcon";

interface PlaceDisplayProps {
  place: number;
}

const PLACE_CONTAINER_DIMENSIONS = "10rem";
const PLACE_CONTAINER_GRADIENT =
  "linear-gradient(90deg,rgba(255, 255, 255, 1) 0%, rgba(155, 134, 249, 1) 100%)";

const PlaceDisplay = ({ place }: PlaceDisplayProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    if (place > 3) return;
    confetti({
      particleCount: 250,
      angle: 270,
      spread: 120,
      origin: { x: 0.5, y: -0.5 },
    });
  }, []);

  return (
    <Box
      sx={{
        height: PLACE_CONTAINER_DIMENSIONS,
        width: PLACE_CONTAINER_DIMENSIONS,
        borderRadius: "50%",
        backgroundColor: "#ffffff",
        background: PLACE_CONTAINER_GRADIENT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: theme.typography.fontWeightBold,
        position: "relative",
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.14, 0.73, 1.91, 0.83],
          },
        }}
        style={{
          position: "absolute",
          top: "-1rem",
          right: "0",
        }}
      >
        <PlaceIcon place={place} />
      </motion.div>
      <Typography color="secondary" variant="h2" component={"span"}>
        {t(`${TRANSLATION_ROOT}.Place`, { count: place, ordinal: true })}
      </Typography>
    </Box>
  );
};

export default PlaceDisplay;
