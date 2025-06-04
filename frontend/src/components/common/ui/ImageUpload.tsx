import React, { useCallback } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDropzone } from "react-dropzone";
import { Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const { t } = useTranslation();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onImageUpload(file);
      }
    },
    [onImageUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxSize: 3 * 1024 * 1024, // 3 MB
  });

  return (
    <Paper
      {...getRootProps()}
      elevation={3}
      sx={{
        p: 4,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "12px",
      }}
    >
      <input {...getInputProps()} />
      <UploadFileIcon sx={{ color: "#2196f3" }} />
      <Typography variant="body1" sx={{ mb: 0.5, color: "contrast.text" }}>
        {t("quiz_form_image_dnd")}
      </Typography>
      <Typography variant="caption" sx={{ color: "gray" }}>
        {t("quiz_form_image_types")}
      </Typography>
      {isDragActive && (
        <Typography variant="body2" sx={{ mt: 2, color: "contrast.text" }}>
          {t("quiz_form_image_dnd_dragging")}
        </Typography>
      )}
    </Paper>
  );
};

export default ImageUpload;
