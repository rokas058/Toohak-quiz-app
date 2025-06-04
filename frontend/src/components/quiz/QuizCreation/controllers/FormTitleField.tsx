import React from "react";
import { Controller, Control } from "react-hook-form";
import WhiteTextField from "@ui/WhiteTextField";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { useTranslation } from "react-i18next";

interface FormTitleFieldProps {
  control: Control<NewQuizRequest>;
}

export const FormTitleField: React.FC<FormTitleFieldProps> = ({ control }) => {
  const { t } = useTranslation();
  const maxTitleLength = 50;
  return (
    <Controller
      name="title"
      control={control}
      rules={{
        required: t("quiz_form_title_required"),
        maxLength: {
          value: maxTitleLength,
          message: maxTitleLength + t("quiz_form_title_maxchar"),
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <WhiteTextField
          {...field}
          id="quiz-title"
          name="quiz-title"
          variant="filled"
          label={t("quiz_form_title")}
          error={!!error}
          slotProps={{
            htmlInput: {
              maxLength: maxTitleLength,
            },
          }}
          helperText={
            error
              ? error.message
              : `${field.value?.length || 0} / ${maxTitleLength}`
          }
        />
      )}
    />
  );
};
