export type ProblemResponse = {
  problemId: number;
  tier: number;
  problemTitle: string;
  score?: number;
  teamName?: string;
};

export type ProblemRequest = {
  userId: number;
  problemNumber: number;
};
