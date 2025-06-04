import { Question } from "@models/Request/NewQuestionRequest";
import { Box, List, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import SingleQuestion from "./SingleQuestion";

interface QuestionsListProps {
  questions: Question[];
}

export const QuestionsList = ({ questions }: QuestionsListProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ width: "100%", maxHeight: 200, overflowY: "auto" }}>
      {questions.length === 0 || undefined ? (
        <Typography variant="body1">{t("quiz_form_no_questions")}</Typography>
      ) : (
        <List>
          {questions.map((question, index) => {
            return (
              <SingleQuestion
                key={question.id}
                question={question}
                position={++index}
              />
            );
          })}
        </List>
      )}
    </Box>
  );
};
export default QuestionsList;
