import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  Question,
  QuestionOption,
} from "@models/Request/NewQuestionRequest.ts";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import ImageUpload from "@components/common/ui/ImageUpload";
import ImageCard from "@components/common/ui/ImageCard";
import { NewQuestionImageResponse } from "@models/Response/NewQuestionImageResponse";
import { useUploadQuestionImage } from "@hooks/useUploadQuestionImage";

interface AddQuestionDialogProps {
  onSave: (question: Question) => void;
  initialData?: Question;
  isOpen?: boolean;
  onClose?: () => void;
}

type FormValues = {
  question: string;
  imageId: string;
  options: string[];
  correctAnswer: string;
};

export default function AddQuestionDialog({
  onSave,
  initialData,
  isOpen,
  onClose,
}: AddQuestionDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const dialogIsOpen = isOpen ?? internalOpen;
  const uploadQuestionImageMutation = useUploadQuestionImage();
  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      question: "",
      imageId: "",
      options: ["", "", "", ""],
      correctAnswer: "0",
    },
  });

  useEffect(() => {
    if (dialogIsOpen) {
      if (initialData) {
        const opts = initialData.questionOptions.map((o) => o.title) as [
          string,
          string,
          string,
          string,
        ];
        const correctIdx = initialData.questionOptions.findIndex(
          (o) => o.isCorrect,
        );
        reset({
          question: initialData.title,
          imageId: initialData.imageId ? initialData.imageId : undefined,
          options: opts,
          correctAnswer: correctIdx.toString(),
        });
      } else {
        reset({
          question: "",
          imageId: "",
          options: ["", "", "", ""],
          correctAnswer: "0",
        });
      }
    }
  }, [dialogIsOpen, initialData, reset]);

  const handleOpen = () => {
    if (isOpen === undefined) setInternalOpen(true);
  };
  const handleClose = () => {
    reset();
    if (onClose) onClose();
    else setInternalOpen(false);
  };

  const onSubmit = (data: FormValues) => {
    const questionOptions: QuestionOption[] = data.options.map(
      (title, idx) => ({
        title,
        ordering: idx + 1,
        isCorrect: idx === parseInt(data.correctAnswer, 10),
      }),
    );
    onSave({ title: data.question, imageId: data.imageId, questionOptions });
    handleClose();
  };

  const handleImageUpload = async (image: File) => {
    const data: NewQuestionImageResponse =
      await uploadQuestionImageMutation.mutateAsync({
        image: image,
      });
    setValue("imageId", data.imageId);
  };

  return (
    <React.Fragment>
      {isOpen === undefined && (
        <Button variant="outlined" onClick={handleOpen}>
          {t("quiz_form_add_question")}
        </Button>
      )}

      <Dialog open={dialogIsOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <Box component="div" id="add-question-form">
            <TextField
              {...register("question", {
                required: t("quiz_form_title_required"),
              })}
              autoFocus
              margin="dense"
              label={`${t("QuestionModal.question")}*`}
              fullWidth
              error={!!errors.question}
              helperText={errors.question?.message}
            />
            {watch("imageId") ? (
              <>
                <ImageCard id={watch("imageId")} />
              </>
            ) : (
              <>
                {" "}
                <ImageUpload
                  onImageUpload={(image: File) => handleImageUpload(image)}
                />
              </>
            )}

            <FormControl
              component="fieldset"
              error={!!errors.options || !!errors.correctAnswer}
              sx={{ mt: 2 }}
              fullWidth
            >
              <Controller
                name="correctAnswer"
                control={control}
                rules={{
                  required: t("quiz_form_correct_answer_required"),
                }}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <Box
                        key={idx}
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Radio value={idx.toString()} />

                        <TextField
                          {...register(`options.${idx}`, {
                            required: t("question_dialog_question_option", {
                              number: idx + 1,
                            }),
                          })}
                          variant="outlined"
                          size="small"
                          label={t("question_dialog_question_option", {
                            number: idx + 1,
                          })}
                          fullWidth
                          error={!!errors.options?.[idx]}
                          helperText={errors.options?.[idx]?.message}
                        />
                      </Box>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.correctAnswer && (
                <FormHelperText>{errors.correctAnswer.message}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            {t("question_dialog_cancel")}
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            {t("question_dialog_save")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
