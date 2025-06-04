export interface PlayerScoreResponse {
  id: string;
  nickname: string;
  score: number;
}

export interface SessionScoreResponse {
  sessionId: string;
  playerScores: PlayerScoreResponse[];
}

export const oldPlayerScores: PlayerScoreResponse[] = [
  { id: "anton", nickname: "Anton", score: 1001 },
  { id: "bobby", nickname: "Bobby", score: 1002 },
  { id: "kate", nickname: "Kate", score: 1003 },
  { id: "sarah", nickname: "Sarah", score: 1004 },
  { id: "john", nickname: "John", score: 1005 },
  { id: "mia", nickname: "Mia", score: 450 },
  { id: "leo", nickname: "Leo", score: 720 },
  { id: "nina", nickname: "Nina", score: 690 },
  { id: "owen", nickname: "Owen", score: 540 },
  { id: "emma", nickname: "Emma", score: 665 },
  { id: "liam", nickname: "Liam", score: 730 },
  { id: "chloe", nickname: "Chloe", score: 610 },
  { id: "max", nickname: "Max", score: 595 },
  { id: "ava", nickname: "Ava", score: 560 },
  { id: "noah", nickname: "Noah", score: 640 },
  { id: "ella", nickname: "Ella", score: 580 },
  { id: "zoe", nickname: "Zoe", score: 505 },
  { id: "jack", nickname: "Jack", score: 675 },
  { id: "luna", nickname: "Luna", score: 630 },
  { id: "finn", nickname: "Finn", score: 600 },
];

export const newPlayerScores: PlayerScoreResponse[] = [
  { id: "anton", nickname: "Anton", score: 2000 },
  { id: "bobby", nickname: "Bobby", score: 2000 },
  { id: "kate", nickname: "Kate", score: 2000 },
  { id: "sarah", nickname: "Sarah", score: 3000 },
  { id: "john", nickname: "John", score: 1005 },
  { id: "mia", nickname: "Mia", score: 700 },
  { id: "leo", nickname: "Leo", score: 2000 },
  { id: "nina", nickname: "Nina", score: 910 },
  { id: "owen", nickname: "Owen", score: 690 },
  { id: "emma", nickname: "Emma", score: 865 },
  { id: "liam", nickname: "Liam", score: 888 },
  { id: "chloe", nickname: "Chloe", score: 795 },
  { id: "max", nickname: "Max", score: 830 },
  { id: "ava", nickname: "Ava", score: 710 },
  { id: "noah", nickname: "Noah", score: 860 },
  { id: "ella", nickname: "Ella", score: 800 },
  { id: "zoe", nickname: "Zoe", score: 3050 },
  { id: "jack", nickname: "Jack", score: 4000 },
  { id: "luna", nickname: "Luna", score: 3200 },
  { id: "finn", nickname: "Finn", score: 3100 },
];
