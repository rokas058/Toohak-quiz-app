export interface PlayerJwtInfo {
  nickname: string;
  quizSessionId: string;
  sub: string;
  iat: number;
  exp: number;
}
