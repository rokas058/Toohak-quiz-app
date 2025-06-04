import WhiteTextField from "@components/common/ui/WhiteTextField";
import { Controller, Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FormData = {
  joinId: string;
};

type JoinCodeControllerProps = {
  control: Control<FormData>;
  error?: { message?: string };
};

const JoinCodeController = ({ control, error }: JoinCodeControllerProps) => {
  const { t } = useTranslation();

  return (
    <Controller
      name="joinId"
      control={control}
      rules={{
        required: t("QuizSession.ValidatorJoinCodeRequired"),
        minLength: {
          value: 5,
          message: t("QuizSession.ValidatorJoinCodeLength"),
        },
        maxLength: {
          value: 5,
          message: t("QuizSession.ValidatorJoinCodeLength"),
        },
      }}
      render={({ field: { onChange, value } }) => (
        <WhiteTextField
          value={value}
          onChange={(e) => {
            let newValue = e.target.value.toUpperCase();
            if (newValue.length > 5) {
              newValue = newValue.slice(0, 5);
            }
            onChange(newValue);
          }}
          placeholder="Enter join code"
          variant="outlined"
          error={Boolean(error)}
          helperText={error ? error.message : ""}
          sx={{ marginBottom: "20px", width: "300px" }}
          trimEnd
        />
      )}
    />
  );
};

export default JoinCodeController;
