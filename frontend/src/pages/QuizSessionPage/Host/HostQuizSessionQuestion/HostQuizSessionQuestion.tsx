import { Box } from "@mui/material";
import AnswerButton from "@components/quizSession/AnswerButton";
import QuestionDisplay from "@components/quizSession/QuestionDisplay";
import CountdownTimer from "@components/CountdownTimer";
import { useHostSessionContext } from "@hooks/context/useHostSessionContext";
import AnswersContainer from "@pages/QuizSessionPage/AnswersContainer";

interface HostQuizSessionQuestionProps {
  duration: number;
}

const HostQuizSessionQuestion: React.FC<HostQuizSessionQuestionProps> = ({
  duration,
}) => {
  const [{ currentQuestion, questionNumber }] = useHostSessionContext();
  const question = currentQuestion!;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", mb: 2 }}>
        <CountdownTimer duration={duration} />
      </Box>

      <QuestionDisplay
        questionTitle={question.title}
        questionNumber={questionNumber}
        questionImage={question.imageId != null ? question.imageId : ""}
      />
      <AnswersContainer>
        {question.questionOptions.map((option, index) => (
          <AnswerButton ordering={index + 1} disabled hostView key={option.id}>
            {option.title}
          </AnswerButton>
        ))}
      </AnswersContainer>
    </Box>
  );
};

export default HostQuizSessionQuestion;
