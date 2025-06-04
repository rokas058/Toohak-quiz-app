// Seperated into component so it's easier to style
// Keep actual logic in QuestionPage

import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import StarIcon from "@mui/icons-material/Star";
import PentagonIcon from "@mui/icons-material/Pentagon";
import { useTheme } from "@mui/material/styles";
import { easeInOut, motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const TextColor = "#000000";
const IconColor = "#f5f3ff";

interface AnswerProps extends React.PropsWithChildren {
  onClick?: () => void;
  ordering: number;
  disabled?: boolean;
  hostView?: boolean;
  correct?: boolean;
}

interface ButtonStyleInfo {
  color: string;
  bgcolor: string;
}

const IconStyling = {
  color: IconColor,
  position: { xs: "static", md: "relative" },
  fontSize: { xs: "7rem", md: "3rem" },
  opacity: { xs: 1, md: 1 },
};

const ButtonIcon = [
  <CircleIcon sx={IconStyling} />,
  <StarIcon sx={IconStyling} />,
  <SquareIcon sx={IconStyling} />,
  <PentagonIcon sx={IconStyling} />,
];

const AnswerButton = ({
  ordering,
  disabled,
  onClick,
  hostView, // Changes button look for host
  children,
  correct,
}: AnswerProps) => {
  const theme = useTheme();
  const tlen = typeof children === "string" ? children.length : 0;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const AnswerText = !isMobile ? children : "";

  const ButtonStyling: ButtonStyleInfo[] = [
    { color: "#00B7F3", bgcolor: "#008ED0" },
    { color: "#F30000", bgcolor: "#D30000" },
    { color: "#41D61A", bgcolor: "#2E9014" },
    { color: "#F3CC00", bgcolor: "#DFBB00" },
  ];

  const getCorrectStyles = (correct: boolean | undefined) => {
    if (correct == null) return {};

    const color = correct
      ? theme.palette.success.light
      : theme.palette.error.light;

    return {
      "&.Mui-disabled": {
        fontWeight: "bold",
        position: "relative",
        boxShadow: `0 0 15px ${color}, 0 0 0 4px ${color}`,
        outline: `3px ${color}`,
        color: TextColor,
      },
    };
  };

  const correctStyles = getCorrectStyles(correct);

  return (
    <motion.div
      style={{ position: "relative" }}
      initial={{ scale: 1 }}
      animate={
        correct && {
          scale: [1, 1.1, 1],
          transition: {
            repeat: 4,
            repeatType: "loop",
            duration: 0.5,
            times: [0, 0.5, 1],
            easings: easeInOut,
          },
        }
      }
    >
      <Button
        disabled={disabled}
        sx={{
          bgcolor: ButtonStyling[ordering - 1].color,
          "&.MuiButtonBase-root:hover": {
            bgcolor: ButtonStyling[ordering - 1].bgcolor,
            color: TextColor,
          },
          "&.Mui-disabled": {
            bgcolor: hostView
              ? ButtonStyling[ordering - 1].color
              : ButtonStyling[ordering - 1].bgcolor,
            color: TextColor,
            outline: hostView ? 0 : 5,
            outlineColor: IconColor,
            outlineOpacity: 0.5,
          },
          color: TextColor,
          borderRadius: 3,
          height: { xs: "30vh", md: 150 },
          width: { xs: "37vw", md: 500 },
          wordBreak: "break-word",
          ...correctStyles,
        }}
        disableElevation
        disableRipple
        disableFocusRipple
        onClick={onClick}
      >
        {ButtonIcon[ordering - 1]}
        <Typography
          sx={{
            fontSize: tlen <= 15 ? 40 : tlen <= 54 ? 30 : 16, // Is there a better way to do this?
            zIndex: 1,
          }}
        >
          {AnswerText}
        </Typography>
      </Button>
      {correct != null && (
        <Box sx={{ position: "absolute", top: "5px", right: "5px" }}>
          {correct ? <CheckCircleIcon /> : <CancelIcon />}
        </Box>
      )}
    </motion.div>
  );
};

export default AnswerButton;
