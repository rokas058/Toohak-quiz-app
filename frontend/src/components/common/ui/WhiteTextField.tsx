import { styled, TextField, TextFieldProps } from "@mui/material";

const InputField = styled(TextField)(({ theme }) => {
  const contrastColor = theme.palette.contrast.text;
  return {
    backgroundColor: theme.palette.background.default,
    "& .MuiInputBase-input": {
      color: contrastColor,
    },
    "& .MuiInputLabel-root": {
      color: contrastColor,
      "&.Mui-focused": {
        color: contrastColor,
      },
      "&.Mui-error": {
        color: "error.main",
      },
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -3px) scale(0.90)",
      fontSize: "0.95rem",
    },
    "& .MuiFilledInput-root": {
      backgroundColor: theme.palette.common.white,
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
    },
    borderRadius: "12px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "gray",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "gray",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "gray",
      },
    },
  };
});

type WhiteTextFieldProps = TextFieldProps & {
  trimEnd?: boolean;
  trimStart?: boolean;
};

const WhiteTextField = ({
  trimEnd,
  trimStart = true,
  ...props
}: WhiteTextFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let modifiedValue = trimStart ? e.target.value.trimStart() : e.target.value;
    modifiedValue = trimEnd ? modifiedValue.trimEnd() : modifiedValue;
    const modifiedEvent = {
      ...e,
      target: {
        ...e.target,
        value: modifiedValue,
      },
    };
    props.onChange?.(modifiedEvent);
  };
  return <InputField {...props} onChange={handleChange} />;
};

export default WhiteTextField;
