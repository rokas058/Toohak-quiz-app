import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  const { t } = useTranslation();

  return (
    <Button variant="contained" onClick={() => loginWithRedirect()}>
      {t("navbar_login")}
    </Button>
  );
}
