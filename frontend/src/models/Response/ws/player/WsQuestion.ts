import { WsQuestionOption } from "./WsQuestionOption";

export interface WsQuestion {
  id: string;
  imageId: string;
  title: string;
  durationSeconds: number;
  questionOptions: WsQuestionOption[];
}
