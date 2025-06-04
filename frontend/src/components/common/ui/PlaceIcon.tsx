import { getMedalColor } from "@utils/gameHelpers";
import { CSSProperties } from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useTheme } from "@mui/material";

interface PlaceIconProps {
  place: number;
}

const PlaceIcon = ({ place }: PlaceIconProps) => {
  const theme = useTheme();

  const iconStyle: CSSProperties = {
    fontSize: theme.typography.h2.fontSize,
    color: getMedalColor(place - 1),
    filter: "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))",
  };

  return place === 1 ? (
    <EmojiEventsIcon style={iconStyle} />
  ) : (
    <WorkspacePremiumIcon style={iconStyle} />
  );
};

export default PlaceIcon;
