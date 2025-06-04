import { WsQuestion } from "@models/Response/ws/player/WsQuestion.ts";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import QuestionDisplay from "@components/quizSession/QuestionDisplay.tsx";
import AnswerButton from "@components/quizSession/AnswerButton.tsx";
import ScoreBackdrop from "@components/quizSession/ScoreBackdrop";
import { useEffect, useState } from "react";
import AnswersContainer from "@pages/QuizSessionPage/AnswersContainer";

enum PlayerQuizSessionAnsweredAnimationState {
  ANSWER,
  BANNER,
}

interface PlayerQuizSessionAnsweredProps {
  question: WsQuestion;
  questionNumber: number;
  correctAnswer: string | null;
  selectedAnswer: string | null;
  userScore: number;
  userPosition: number;
}

const PlayerQuizSessionAnswered = ({
  question,
  questionNumber,
  correctAnswer,
  selectedAnswer,
  userScore,
  userPosition,
}: PlayerQuizSessionAnsweredProps) => {
  const { t } = useTranslation();

  const [animationState, setAnimationState] =
    useState<PlayerQuizSessionAnsweredAnimationState>(
      PlayerQuizSessionAnsweredAnimationState.ANSWER,
    );

  useEffect(() => {
    const t1 = setTimeout(() => {
      setAnimationState(PlayerQuizSessionAnsweredAnimationState.BANNER);
    }, 2000);
    return () => {
      clearTimeout(t1);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          mt: 3,
        }}
      >
        <QuestionDisplay
          questionTitle={question.title}
          questionNumber={questionNumber}
          questionImage={""}
        />

        <AnswersContainer>
          {question.questionOptions.map((option, index) => {
            const isCorrect =
              option.id === selectedAnswer || option.id === correctAnswer
                ? option.id === correctAnswer
                : undefined;

            return (
              <AnswerButton
                key={option.id}
                ordering={index + 1}
                disabled={true}
                hostView={true}
                correct={isCorrect}
              >
                {option.title}
              </AnswerButton>
            );
          })}
        </AnswersContainer>
        <Typography variant="body1" sx={{ mt: 3 }}>
          {t("QuizSession.waitingForNextQuestion")}
        </Typography>
      </Box>

      {animationState === PlayerQuizSessionAnsweredAnimationState.BANNER && (
        <ScoreBackdrop
          score={userScore}
          position={userPosition}
          correct={correctAnswer === selectedAnswer}
        />
      )}
    </>
  );
};

export default PlayerQuizSessionAnswered;
