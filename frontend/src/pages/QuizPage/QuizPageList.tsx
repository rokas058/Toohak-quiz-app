import { List, styled } from "@mui/material";

const QuizPageList = styled(List)(({ theme }) => {
  return {
    border: `solid 1px ${theme.palette.common.white}`,
    borderRadius: theme.borderRadius!.md,
    padding: 0,
  };
});

export default QuizPageList;
