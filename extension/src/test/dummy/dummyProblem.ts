import { ProblemResponse } from '../../@types/Problem';

export const dummyProblem: ProblemResponse = {
  problemId: 1000,
  tier: 1,
  problemTitle: 'A+B 정상적으로 되는 문제 번호',
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

export const dummyUpdateProblem: ProblemResponse = {
  problemId: 1,
  tier: 1,
  problemTitle: 'hello world',
  score: 10,
  teamName: '42seoul',
};

export const dummyProblems: ProblemResponse[] = [dummyProblem, dummyProblem1, dummyProblem2, dummyProblem3];
export const dummyUpdateProblems: ProblemResponse[] = [dummyUpdateProblem];
