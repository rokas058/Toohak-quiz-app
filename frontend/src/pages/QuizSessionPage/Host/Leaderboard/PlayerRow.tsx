import { forwardRef, memo } from "react";
import { Paper, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { CARD_BACKGROUND_PURPLE } from "@assets/styles/constants";
import { PlayerScoreResponse } from "@models/Response/PlayerScoreResponse";

export interface PlayerRowProps {
  player: PlayerScoreResponse;
  displayScore: number;
  hasChanged: boolean;
  showHighlightBar: boolean;
  highlightedColor: string;
}

const MotionPaper = motion(Paper);

// Use forwardRef so we can accept a ref from AnimatePresence/LayoutGroup
const PlayerRowComponent = forwardRef<HTMLDivElement, PlayerRowProps>(
  (
    { player, displayScore, hasChanged, showHighlightBar, highlightedColor },
    ref,
  ) => (
    <MotionPaper
      ref={ref}
      layout
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        layout: { type: "spring", bounce: 0.15, duration: 0.6 },
      }}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: CARD_BACKGROUND_PURPLE,
        borderRadius: "12px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
        px: 4,
        py: 2.5,
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {showHighlightBar && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "8px",
            backgroundColor: highlightedColor,
          }}
        />
      )}

      <Typography variant="h6">{player.nickname}</Typography>

      {hasChanged ? (
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.4, times: [0, 0.5, 1] }}
        >
          <Typography
            variant="h6"
            sx={{ minWidth: "40px", textAlign: "right" }}
          >
            {displayScore}
          </Typography>
        </motion.div>
      ) : (
        <Typography variant="h6" sx={{ minWidth: "40px", textAlign: "right" }}>
          {displayScore}
        </Typography>
      )}
    </MotionPaper>
  ),
);

export const PlayerRow = memo(
  PlayerRowComponent,
  (prev, next) =>
    prev.player.id === next.player.id &&
    prev.displayScore === next.displayScore &&
    prev.hasChanged === next.hasChanged &&
    prev.showHighlightBar === next.showHighlightBar,
);

export default PlayerRow;
