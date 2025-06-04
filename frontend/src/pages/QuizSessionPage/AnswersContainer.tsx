import { Box, useTheme } from "@mui/material";
import React from "react";

const AnswersContainer = ({ children }: React.PropsWithChildren) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto auto",
        gap: theme.spacing(3),
        mt: theme.spacing(2),
      }}
    >
      {children}
    </Box>
  );
};

export default AnswersContainer;
