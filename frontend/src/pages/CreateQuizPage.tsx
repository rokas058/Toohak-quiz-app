import React from "react";
import { useCreateQuiz } from "@hooks/useCreateQuiz";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { QuizForm } from "@components/quiz/QuizCreation/QuizForm";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const CreateQuizPage: React.FC = () => {
  const createQuizMutation = useCreateQuiz();
  const { t } = useTranslation();

  const handleCreateQuiz = (data: NewQuizRequest) => {
    createQuizMutation.mutate(data);
  };

  return (
    <>
      <Typography variant="h2" component="h2" align="left" sx={{ mb: 3 }}>
        {t("quiz_form_create_new_quiz")}
      </Typography>
      <QuizForm
        onSubmit={handleCreateQuiz}
        isSubmitting={createQuizMutation.isPending}
      />
    </>
  );
};

export default CreateQuizPage;
