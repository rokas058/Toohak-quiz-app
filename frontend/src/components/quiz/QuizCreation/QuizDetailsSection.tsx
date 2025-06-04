import React from "react";
import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { FormTitleField } from "./controllers/FormTitleField";
import { FormDescriptionField } from "./controllers/FormDescriptionField";
import { FormImageUploadField } from "./controllers/FormImageUploadField";

const QuizDetailsSection: React.FC = () => {
  const { control } = useFormContext<NewQuizRequest>();

  return (
    <Stack spacing={3}>
      <FormTitleField control={control} />
      <FormDescriptionField control={control} />
      <FormImageUploadField control={control} />
    </Stack>
  );
};

export default QuizDetailsSection;
