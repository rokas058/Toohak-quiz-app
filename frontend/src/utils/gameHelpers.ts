export const getMedalColor = (position: number): string => {
  switch (position) {
    case 0:
      return "#ffd700"; // Gold
    case 1:
      return "#c0c0c0"; // Silver
    case 2:
      return "#cd7f32"; // Bronze
    default:
      return "transparent";
  }
};
