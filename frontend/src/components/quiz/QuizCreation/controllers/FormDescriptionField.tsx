import React from "react";
import { Controller, useWatch, Control } from "react-hook-form";
import WhiteTextField from "@ui/WhiteTextField";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { useTranslation } from "react-i18next";

interface FormDescriptionFieldProps {
  control: Control<NewQuizRequest>;
}

export const FormDescriptionField: React.FC<FormDescriptionFieldProps> = ({
  control,
}) => {
  const { t } = useTranslation();
  const descriptionValue = useWatch({
    control,
    name: "description",
    defaultValue: "",
  });
  const maxDescriptionLength = 500;

  return (
    <Controller
      name="description"
      control={control}
      rules={{
        maxLength: {
          value: maxDescriptionLength,
          message: maxDescriptionLength + t("quiz_form_description_maxchar"),
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <WhiteTextField
          {...field}
          id="quiz-description"
          name="quiz-description"
          variant="filled"
          label={t("quiz_form_description")}
          multiline
          rows={4}
          slotProps={{
            htmlInput: { maxLength: maxDescriptionLength },
          }}
          error={!!error}
          helperText={
            error
              ? error.message
              : `${descriptionValue?.length || 0} / ${maxDescriptionLength}`
          }
          fullWidth
        />
      )}
    />
  );
};
