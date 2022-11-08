export type ProblemResponse = {
  problemId: number;
  tier: number;
  problemTitle: string;
};

export type ProblemRequest = {
  userId: number;
  problemNumber: number;
};
