import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { showToast } from "@components/common/ui/Toast";
import { useSessionRejoin } from "@contexts/SessionRejoinContext";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { showError } = showToast();
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { rejoinCode, refreshRejoinCode } = useSessionRejoin();

  const handleRejoinClick = async () => {
    const code = await refreshRejoinCode();

    if (code) {
      navigate(`/session/${code}`);
    } else {
      showError(t("homepage_error_rejoin"));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        pt: 10,
        px: 2,
      }}
    >
      <Typography variant="h2">{t("homepage_title")}</Typography>
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        {isAuthenticated
          ? t("homepage_description_host")
          : t("homepage_description_player")}
      </Typography>

      {!isAuthenticated && (
        <Button component={Link} to="/join" variant="outlined" sx={{ mt: 3 }}>
          {t("homepage_joingame")}
        </Button>
      )}

      {rejoinCode && (
        <Button
          variant="outlined"
          onClick={handleRejoinClick}
          sx={{ mt: 3, ml: 2 }}
        >
          {t("homepage_rejoin", { code: rejoinCode })}
        </Button>
      )}
    </Box>
  );
};

export default HomePage;
