import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import i18next from "i18next";

type Language = {
  nativeName: string;
};

const lngs: Record<string, Language> = {
  en: { nativeName: "English" },
  lt: { nativeName: "Lietuvių" },
};

const LanguageSwitchButton: React.FC = () => {
  return (
    <ButtonGroup variant="contained" color="primary">
      {Object.keys(lngs).map((lng) => (
        <Button
          key={lng}
          onClick={() => i18next.changeLanguage(lng)}
          disabled={i18next.resolvedLanguage === lng}
        >
          {lngs[lng].nativeName}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default LanguageSwitchButton;
