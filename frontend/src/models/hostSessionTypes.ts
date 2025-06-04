import { QuestionResponse } from "./Response/questionResponse";

export enum HostSessionActionTypes {
  NEW_QUESTION,
}

export interface HostSessionComponentEvents<EventType extends number> {
  event: EventType;
}

export interface HostSessionComponentEventNewQuestion
  extends HostSessionComponentEvents<HostSessionActionTypes.NEW_QUESTION> {
  event: HostSessionActionTypes;
  questions: QuestionResponse[];
}
