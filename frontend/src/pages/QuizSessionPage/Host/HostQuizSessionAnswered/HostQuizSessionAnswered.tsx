import AnswerButton from "@components/quizSession/AnswerButton";
import QuestionDisplay from "@components/quizSession/QuestionDisplay";
import { Box, Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Leaderboard from "../Leaderboard/Leaderboard";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { nextQuestion } from "@api/QuizSessionApi";
import LoadingBackdrop from "@components/common/ui/LoadingBackdrop";
import { useTranslation } from "react-i18next";
import { useHostSessionContext } from "@hooks/context/useHostSessionContext";
import { TRANSLATION_ROOT } from "../HostQuizSession";
import AnswersContainer from "@pages/QuizSessionPage/AnswersContainer";

interface HostQuizSessionAnsweredProps {
  sessionId: string;
  numberOfQuestions: number;
  onNextQuestionSuccess: (duration: number) => void;
}

enum SessionAnsweredAnimationState {
  ANSWER,
  LEADERBOARD,
}

const HostQuizSessionAnswered = ({
  sessionId,
  numberOfQuestions,
  onNextQuestionSuccess,
}: HostQuizSessionAnsweredProps) => {
  const [
    {
      correctQuestionOption,
      questionNumber,
      oldScores,
      newScores,
      currentQuestion,
    },
  ] = useHostSessionContext();
  const { t } = useTranslation();
  const [animationState, setAnimationState] =
    useState<SessionAnsweredAnimationState>(
      SessionAnsweredAnimationState.ANSWER,
    );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationState(SessionAnsweredAnimationState.LEADERBOARD);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: async (sessionId: string) => {
      const { status, data } = await nextQuestion(sessionId);
      if (status === 200 && !isQuizOver) {
        onNextQuestionSuccess(data.durationSeconds);
      }
    },
  });

  const handleNewQuestionClick = () => {
    mutate(sessionId);
  };

  if (isPending)
    return (
      <>
        <Typography variant="h5">
          {t(`${TRANSLATION_ROOT}.LoadingQuestion`)}
        </Typography>
        <LoadingBackdrop />
      </>
    );

  const oldScoresMapped = oldScores.map((playerScore) => ({
    id: playerScore.userId,
    nickname: playerScore.nickname,
    score: playerScore.score,
  }));
  const newScoresMapped = newScores.map((playerScore) => ({
    id: playerScore.userId,
    nickname: playerScore.nickname,
    score: playerScore.score,
  }));

  const question = currentQuestion!;

  const isQuizOver = numberOfQuestions === questionNumber;

  return (
    <Box sx={{ overflow: "hidden", p: 1 }}>
      {animationState === SessionAnsweredAnimationState.LEADERBOARD && (
        <motion.div
          initial={{ translateX: "150%" }}
          animate={{
            translateX: "0",
            transition: { duration: 1, type: "spring" },
          }}
        >
          <Stack spacing={2} alignItems={"center"}>
            <Leaderboard
              oldPoints={oldScoresMapped}
              newPoints={newScoresMapped}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={handleNewQuestionClick}
            >
              {isQuizOver
                ? t(`${TRANSLATION_ROOT}.FinishQuizButtonLabel`)
                : t(`${TRANSLATION_ROOT}.LoadNextQuestionButtonLabel`)}
            </Button>
          </Stack>
        </motion.div>
      )}
      {animationState === SessionAnsweredAnimationState.ANSWER && (
        <>
          <motion.div
            animate={{
              translateY: "-150%",
              transition: { duration: 2, delay: 2, type: "spring" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "flex-start",
                alignItems: "center",
              }}
            >
              <QuestionDisplay
                questionImage={question.imageId ?? ""}
                questionNumber={questionNumber}
                questionTitle={question.title}
              />
            </Box>
          </motion.div>
          <motion.div
            style={{ marginInline: "auto", width: "fit-content" }}
            animate={{
              translateY: "150%",
              transition: { duration: 2, delay: 2, type: "spring" },
            }}
          >
            <AnswersContainer>
              {question.questionOptions.map((option) => {
                const isCorrect =
                  option.id === correctQuestionOption ? true : undefined;
                return (
                  <AnswerButton
                    key={option.id}
                    ordering={option.ordering}
                    disabled
                    hostView
                    correct={isCorrect}
                  >
                    {option.title}
                  </AnswerButton>
                );
              })}
            </AnswersContainer>
          </motion.div>
        </>
      )}
    </Box>
  );
};

export default HostQuizSessionAnswered;
