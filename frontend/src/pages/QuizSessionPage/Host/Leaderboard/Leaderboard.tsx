import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Box } from "@mui/material";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import PlayerRow from "./PlayerRow";
import { PlayerScoreResponse } from "@models/Response/PlayerScoreResponse";
import { getMedalColor } from "@utils/gameHelpers";

const enum AnimationStates {
  INITIAL,
  NEW,
  SORTED,
}

const ANIMATION_TIMING = {
  NEW_SCORES_DELAY: 800, // Delay before showing new scores
  SORT_DELAY: 1000, // Additional delay before sorting
};

const PLAYERS_DISPLAYED = 5;

interface LeaderboardProps {
  oldPoints: PlayerScoreResponse[];
  newPoints: PlayerScoreResponse[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ oldPoints, newPoints }) => {
  const sortedOldPoints = useMemo(
    () => [...oldPoints].sort((a, b) => b.score - a.score),
    [oldPoints],
  );
  const sortedNewPoints = useMemo(
    () => [...newPoints].sort((a, b) => b.score - a.score),
    [newPoints],
  );

  const [displayState, setDisplayState] = useState<AnimationStates>(
    AnimationStates.INITIAL,
  );
  const [displayPoints, setDisplayPoints] = useState(sortedOldPoints);

  const scoreChanges = useMemo(() => {
    const changes: Record<string, { oldScore: number; newScore: number }> = {};

    const allPlayerIds = new Set([
      ...oldPoints.map((p) => p.id),
      ...newPoints.map((p) => p.id),
    ]);

    allPlayerIds.forEach((id) => {
      const oldPlayer = oldPoints.find((p) => p.id === id);
      const newPlayer = newPoints.find((p) => p.id === id);

      const oldScore = oldPlayer?.score ?? 0;
      const newScore = newPlayer?.score ?? 0;

      changes[id] = {
        oldScore,
        newScore,
      };
    });

    return changes;
  }, [oldPoints, newPoints]);

  useEffect(() => {
    setDisplayState(AnimationStates.INITIAL);
    setDisplayPoints(sortedOldPoints);

    const t1 = setTimeout(() => {
      setDisplayState(AnimationStates.NEW);
    }, ANIMATION_TIMING.NEW_SCORES_DELAY);

    const t2 = setTimeout(() => {
      setDisplayPoints(sortedNewPoints);
      setDisplayState(AnimationStates.SORTED);
    }, ANIMATION_TIMING.NEW_SCORES_DELAY + ANIMATION_TIMING.SORT_DELAY);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [oldPoints, newPoints, sortedOldPoints, sortedNewPoints]);

  const getDisplayScore = useCallback(
    (id: string) => {
      if (scoreChanges[id])
        return displayState === AnimationStates.INITIAL
          ? scoreChanges[id].oldScore
          : scoreChanges[id].newScore;
      else return 0;
    },
    [displayState, scoreChanges],
  );

  const hasScoreChanged = useCallback(
    (id: string) => {
      if (scoreChanges[id])
        return scoreChanges[id].oldScore !== scoreChanges[id].newScore;
      else return false;
    },
    [scoreChanges],
  );

  const getHighlightColor = useCallback(
    (index: number) => getMedalColor(index),
    [],
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", px: 2 }}>
      {/* 
      LayoutGroup synchronizes all FLIP-based layout animations
      for its children (motion.div with `layout` props below).
      */}
      <LayoutGroup>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            position: "relative",
          }}
        >
          {/*
          AnimatePresence enables exit animations for items
          removed from the list. `mode="popLayout"` instant-removes
          the item from layout (so siblings can reflow immediately),
          then plays its exit transition.
          */}
          <AnimatePresence mode="popLayout">
            {displayPoints.slice(0, PLAYERS_DISPLAYED).map((player, index) => {
              const displayScore = getDisplayScore(player.id);
              const changed =
                hasScoreChanged(player.id) &&
                displayState !== AnimationStates.INITIAL;
              const highlightColor = getHighlightColor(index);

              return (
                <PlayerRow
                  key={player.id}
                  player={player}
                  displayScore={displayScore}
                  hasChanged={changed}
                  showHighlightBar={displayState === AnimationStates.SORTED}
                  highlightedColor={highlightColor}
                />
              );
            })}
          </AnimatePresence>
        </Box>
      </LayoutGroup>
    </Box>
  );
};

export default Leaderboard;
