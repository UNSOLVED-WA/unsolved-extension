export type SolvingProblemRequest = {
  userId: number;
  problemNumber: number;
};

export type SolvingProblemResponse = {
  problemId: number;
  tier: number;
  problemTitle: string;
  score: number;
  teamName: string;
};
