import { Box, CardMedia, CircularProgress } from "@mui/material";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { fetchImageById } from "@api/QuizApi";
import { useQuery } from "@tanstack/react-query";

interface ImageCardProps {
  id: string | null;
  alt?: string;
  maxHeight?: string;
  maxWidth?: string;
}

const ImageCard = ({
  alt = "Cover image",
  id,
  maxHeight = "500px",
  maxWidth = "80%",
}: ImageCardProps) => {
  const {
    data: coverImage,
    isLoading: imageLoading,
    error: imageError,
  } = useQuery<string>({
    queryKey: ["coverImage", id],
    queryFn: () => fetchImageById(id!),
    enabled: !!id,
    retry: false,
  });

  if (imageLoading) return <CircularProgress />;

  return !imageError && coverImage ? (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardMedia
        sx={{
          height: "auto",
          width: "auto",
          maxHeight: maxHeight,
          maxWidth: maxWidth,
          objectFit: "contain",
        }}
        component="img"
        image={coverImage}
        alt={alt}
      />
    </Box>
  ) : (
    <ImageNotSupportedOutlinedIcon
      sx={{
        fontSize: { xs: 100, sm: 150, md: 200, lg: 250 },
        color: "white",
        opacity: 0.3,
      }}
    />
  );
};

export default ImageCard;
