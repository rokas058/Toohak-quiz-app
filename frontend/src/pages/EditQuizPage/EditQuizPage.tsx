import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuiz } from "@hooks/useQuiz";
import Loader from "@components/Loader";
import { useUpdateQuiz } from "@hooks/useUpdateQuiz";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { useDeleteQuiz } from "@hooks/useDeleteQuiz";
import EditQuizForm from "./EditQuizForm";
import ConfirmationDialog from "@components/ConfirmationDialog";
import { useTranslation } from "react-i18next";

const EditQuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: quiz, isLoading, error } = useQuiz(id);
  const { mutate: updateQuiz } = useUpdateQuiz();
  const { mutate: deleteQuiz } = useDeleteQuiz();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { t } = useTranslation();

  if (isLoading) return <Loader />;
  if (error instanceof Error) return <p>{error.message}</p>;

  const handleEditQuiz = (data: NewQuizRequest) => {
    if (!id) return;
    updateQuiz({ id, data });
  };

  const handleDeleteQuiz = (id: string) => {
    deleteQuiz(id);
  };

  return (
    <>
      <Box display={"flex"} gap={2}>
        <Typography variant="h3" align="left">
          {t("EditQuizPage.EditQuiz")}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            color="error"
            variant="contained"
            onClick={() => setOpenConfirmation(true)}
          >
            {t("EditQuizPage.DeleteButton")}
          </Button>
        </Box>
      </Box>
      <EditQuizForm initialData={quiz!} onSubmit={handleEditQuiz} />
      <ConfirmationDialog
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        onConfirm={() => handleDeleteQuiz(id!)}
        message={t("ConfirmationDialog.messageDeleteQuiz")}
      />
    </>
  );
};

export default EditQuizPage;
