import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  confirmText?: string;
  cancelText?: string;
};

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  message,
  confirmText,
  cancelText,
}: ConfirmationDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          {message || t("ConfirmationDialog.defaultMessage")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {cancelText || t("ConfirmationDialog.defaultDecline")}
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" autoFocus>
          {confirmText || t("ConfirmationDialog.defaultConfirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmationDialog;
