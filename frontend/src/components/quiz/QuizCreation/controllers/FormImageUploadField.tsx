import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUploadCoverImage } from "@hooks/useUploadCoverImage";
import { Box, Button, Typography } from "@mui/material";
import ImageUpload from "@components/common/ui/ImageUpload";
import { NewQuizCoverImageResponse } from "@models/Response/NewQuizCoverImageResponse";
import { CoverImagePreview } from "@components/quiz/QuizCreation/controllers/CoverImagePreview";
import { useDeleteQuizImage } from "@hooks/useDeleteQuizImage";
import { useParams } from "react-router-dom";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import ConfirmationDialog from "@components/ConfirmationDialog";

interface FormImageUploadFieldProps {
  control: Control<NewQuizRequest>;
}

export const FormImageUploadField: React.FC<FormImageUploadFieldProps> = ({
  control,
}) => {
  const { t } = useTranslation();
  const { id: quizId } = useParams<{ id: string }>();
  const uploadCoverImageMutation = useUploadCoverImage();
  const { mutate: deleteQuizImage } = useDeleteQuizImage(quizId!);
  const [isNewImage, setIsNewImage] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleImageUpload = async (
    image: File,
    onChange: (value: string | undefined) => void,
  ) => {
    const data: NewQuizCoverImageResponse =
      await uploadCoverImageMutation.mutateAsync({
        image: image,
      });
    onChange(data.imageId);
    setIsNewImage(true);
  };

  const handleDelete = (onChange: (value: string | null) => void) => {
    if (!isNewImage) {
      deleteQuizImage(quizId!);
    }
    onChange(null);
    setOpenConfirmation(false);
  };

  return (
    <Controller
      name="imageId"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Typography variant="h5" align="left">
            {t("quiz_form_image_upload")}
          </Typography>
          {!field.value ? (
            <ImageUpload
              onImageUpload={(image: File) =>
                handleImageUpload(image, field.onChange)
              }
            />
          ) : (
            <Box
              mt={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
            >
              <CoverImagePreview imageId={field.value} />
              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                color="error"
                onClick={() => setOpenConfirmation(true)}
              >
                {t("quiz_form_image_remove")}
              </Button>
              <ConfirmationDialog
                open={openConfirmation}
                onClose={() => setOpenConfirmation(false)}
                onConfirm={() => handleDelete(field.onChange)}
                message={t("ConfirmationDialog.deleteQuizImage")}
              />
            </Box>
          )}
          {error && <span>{error.message}</span>}
        </>
      )}
    />
  );
};
