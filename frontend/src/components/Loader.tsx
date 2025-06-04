import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Loader = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <CircularProgress size={100} thickness={5} color="inherit" />
      <Typography variant="h5" sx={{ mt: 3, color: "inherit" }}>
        {t("loading")}
      </Typography>
    </Box>
  );
};

export default Loader;
