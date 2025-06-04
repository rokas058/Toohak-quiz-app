import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { t } = useTranslation();

  return (
    <Button
      variant="contained"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      {t("navbar_logout")}
    </Button>
  );
};

export default LogoutButton;
