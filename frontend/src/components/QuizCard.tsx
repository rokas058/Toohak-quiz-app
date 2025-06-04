import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActionArea,
  CardMedia,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { QuizCardResponse } from "@models/Response/quizCardResponse";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { PrivateAppRoutes } from "../models/PrivateRoutes";

import {
  CARD_BACKGROUND_PURPLE,
  IMAGE_BACKGROUND_LIGHT_PURPLE,
  TEXT_LIGHT_BLUE,
} from "@assets/styles/constants";
import { fetchImageById } from "@api/QuizApi";
import { useQuery } from "@tanstack/react-query";

interface QuizCardProps {
  quiz: QuizCardResponse;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const theme = useTheme();
  const lastModified = new Date(quiz.updatedAt).toLocaleDateString();

  const {
    data: coverImage,
    isLoading: imageLoading,
    error: imageError,
  } = useQuery<string>({
    queryKey: ["coverImage", quiz.coverImageId],
    queryFn: () => fetchImageById(quiz.coverImageId!),
    enabled: Boolean(quiz.coverImageId),
  });

  return (
    <Card
      sx={{
        height: 300,
        borderRadius: 3,
        backgroundColor: CARD_BACKGROUND_PURPLE,
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        component={Link}
        to={PrivateAppRoutes.QUIZ_PAGE.replace(":id", quiz.id)}
      >
        <Box
          sx={{
            height: 140,
            backgroundColor: IMAGE_BACKGROUND_LIGHT_PURPLE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            m: 2,
            mb: 0,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {quiz.coverImageId ? (
            imageLoading ? (
              <CircularProgress />
            ) : imageError || !coverImage ? (
              <ImageNotSupportedOutlinedIcon
                sx={{ fontSize: 80, color: "black" }}
              />
            ) : (
              <CardMedia
                component="img"
                image={coverImage}
                alt="Quiz Cover"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )
          ) : (
            <ImageNotSupportedOutlinedIcon
              sx={{ fontSize: 80, color: "black" }}
            />
          )}
        </Box>

        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            color: TEXT_LIGHT_BLUE,
            p: 2,
            pt: 1,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            title={quiz.title}
            sx={{
              textAlign: "left",
              fontWeight: "bold",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {quiz.title}
          </Typography>

          <Typography
            variant="body2"
            title={quiz.description}
            sx={{
              height: 40,
              textAlign: "left",
              overflowWrap: "break-word",
              ...theme.multiLineEllipsis(2),
            }}
          >
            {quiz.description}
          </Typography>

          <Box
            sx={{
              mt: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            <Typography variant="caption">
              Last modified: {lastModified}
            </Typography>
            <Typography variant="body2">Q: {quiz.questionAmount}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QuizCard;
