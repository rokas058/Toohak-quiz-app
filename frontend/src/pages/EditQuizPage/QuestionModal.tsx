import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  Question,
  QuestionOption,
} from "@models/Request/NewQuestionRequest.ts";
import { useTranslation } from "react-i18next";
import { normalizeOptions } from "@utils/normalizeOptions";
import { getDefaultOptions } from "@utils/getDefaultOptions";
import { showToast } from "@components/common/ui/Toast";
import ImageUpload from "@components/common/ui/ImageUpload";
import ImageCard from "@components/common/ui/ImageCard";
import { NewQuestionImageResponse } from "@models/Response/NewQuestionImageResponse";
import { useUploadQuestionImage } from "@hooks/useUploadQuestionImage";

type QuestionModalProps = {
  onSave: (question: Question) => void;
  initialData?: Question;
  open: boolean;
  onClose: () => void;
};

const QuestionModal = ({
  initialData,
  onSave,
  onClose,
  open,
}: QuestionModalProps) => {
  const { t } = useTranslation();
  const { showError } = showToast();
  const uploadQuestionImageMutation = useUploadQuestionImage();
  const [questionOptions, setQuestionOptions] = useState<QuestionOption[]>(
    normalizeOptions(initialData?.questionOptions),
  );
  const [questionTitle, setQuestionTitle] = useState<string>(
    initialData?.title ?? "",
  );
  const [imageId, setImageId] = useState<string>(initialData?.imageId ?? "");

  const handleQuestionChange = (title: string) => {
    setQuestionTitle(title);
  };

  const handleAnswerChange = (index: number, newTitle: string) => {
    setQuestionOptions((prevOption) =>
      prevOption.map((o) =>
        o.ordering === index ? { ...o, title: newTitle } : o,
      ),
    );
  };

  const handleCorrectChange = (index: number) => {
    setQuestionOptions((prev) =>
      prev.map((o) => ({ ...o, isCorrect: o.ordering === index })),
    );
  };

  const handleModalSubmit = () => {
    const options: QuestionOption[] = questionOptions.map((option) => ({
      id: option.id,
      title: option.title,
      ordering: option.ordering,
      isCorrect: option.isCorrect,
    }));
    const questionData: Question = {
      id: initialData?.id,
      title: questionTitle,
      imageId: imageId,
      questionOptions: options,
    };

    const hasEmptyOption = questionOptions.some(
      (option) => option.title.trim() === "",
    );
    if (hasEmptyOption || questionData.title === "") {
      showError(t("Error.Question.emptyFields"));
      return;
    }
    onSave(questionData);
    onClose();
  };

  useEffect(() => {
    const resetModalState = () => {
      const title = initialData?.title ?? "";
      const image = initialData?.imageId ?? "";
      const options = initialData?.questionOptions
        ? normalizeOptions(initialData.questionOptions)
        : getDefaultOptions();
      setQuestionTitle(title);
      setQuestionOptions(options);
      setImageId(image);
    };
    if (open) {
      resetModalState();
    }
  }, [open, initialData]);

  const handleImageUpload = async (image: File) => {
    const data: NewQuestionImageResponse =
      await uploadQuestionImageMutation.mutateAsync({
        image: image,
      });
    setImageId(data.imageId);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            bgcolor: "#4A28C6",
            borderRadius: 2,
            p: 2,
            width: "99%",
            maxWidth: 600,
            boxShadow: 24,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <TextField
            margin="dense"
            label={t("QuestionModal.question")}
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 3 }}
            value={questionTitle}
            onChange={(e) => handleQuestionChange(e.target.value)}
          />
          {imageId != "" ? (
            <>
              <ImageCard id={imageId} />
            </>
          ) : (
            <>
              {" "}
              <ImageUpload
                onImageUpload={(image: File) => handleImageUpload(image)}
              />
            </>
          )}
          <FormControl sx={{ mt: 2 }} fullWidth>
            <RadioGroup>
              {questionOptions.map((option) => (
                <Box
                  key={option.ordering}
                  display="flex"
                  alignItems="center"
                  mb={1}
                >
                  <Radio
                    checked={option.isCorrect}
                    onChange={() => handleCorrectChange(option.ordering)}
                  />
                  <TextField
                    fullWidth
                    label={t("QuestionModal.questionOption", {
                      number: option.ordering,
                    })}
                    variant="outlined"
                    size="small"
                    value={option.title}
                    required
                    onChange={(e) =>
                      handleAnswerChange(option.ordering, e.target.value)
                    }
                  />
                </Box>
              ))}
            </RadioGroup>
            <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
              <Button onClick={onClose} variant="contained">
                {t("QuestionModal.cancel")}
              </Button>
              <Button onClick={handleModalSubmit} variant="contained">
                {t("QuestionModal.save")}
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};
export default QuestionModal;
