import { ListItem, styled } from "@mui/material";

const QuizPageListItem = styled(ListItem)(({ theme }) => {
  return {
    paddingLeft: theme.spacing(1),
    gap: theme.spacing(1),
    "&:nth-of-type(odd)": {
      background: `${theme.palette.primary.dark}50`,
      display: "flex",
    },
    "&.MuiListItem-root span": {
      ...theme.typography.h5,
    },
  };
});

export default QuizPageListItem;
