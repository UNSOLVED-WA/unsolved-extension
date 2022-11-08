export type SolvingProblemRequestDto = {
  userId: number;
  problemNumber: number;
};

export type SolvingProblemResponseDto = {
  problemId: number;
  tier: number;
  problemTitle: string;
  score: number;
  teamName: string;
};
