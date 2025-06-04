import { Backdrop, CircularProgress } from "@mui/material";

const LoadingBackdrop = () => {
  return (
    <Backdrop component={"div"} open>
      <CircularProgress />
    </Backdrop>
  );
};

export default LoadingBackdrop;
