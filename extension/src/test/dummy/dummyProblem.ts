import { ProblemResponse } from '../../@types/Problem';

export const dummyProblem: ProblemResponse = {
  problemId: 1,
  tier: 1,
  problemTitle: 'Hello World',
};

export const dummyProblem1: ProblemResponse = {
  problemId: 2,
  tier: 1,
  problemTitle: '은행원 문제',
};

export const dummyProblem2: ProblemResponse = {
  problemId: 3,
  tier: 2,
  problemTitle: '문제 제목이 길면 어떻게 되는지 실험해보자',
};

export const dummyProblem3: ProblemResponse = {
  problemId: 4,
  tier: 2,
  problemTitle: "Let's try to make a problem title that is too long",
};

export const dummyProblems: ProblemResponse[] = [dummyProblem, dummyProblem1, dummyProblem2, dummyProblem3];
