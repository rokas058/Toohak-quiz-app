import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CardMedia, CircularProgress } from "@mui/material";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { fetchImageById } from "@api/QuizApi";

export const CoverImagePreview: React.FC<{ imageId: string }> = ({
  imageId,
}) => {
  const {
    data: coverImage,
    isLoading,
    error,
  } = useQuery<string>({
    queryKey: ["coverImage", imageId],
    queryFn: () => fetchImageById(imageId),
    enabled: Boolean(imageId),
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error || !coverImage) {
    return (
      <ImageNotSupportedOutlinedIcon sx={{ fontSize: 80, color: "black" }} />
    );
  }

  return (
    <CardMedia
      component="img"
      image={coverImage}
      alt="Cover"
      sx={{
        display: "flex",
        justifyContent: "center",
        maxHeight: 600,
        maxWidth: "100%",
        width: "auto",
        objectFit: "contain",
      }}
    />
  );
};
