import { UnsolvedUser } from '../@types/UnsolvedUser';
import { ProblemResponse } from '../@types/Problem';
import { Ranking } from '../@types/Ranking';

import { dummyUnsolvedUser } from '../test/dummy/dummyUser';
import { dummyProblem } from '../test/dummy/dummyProblem';
import { dummyAllRanking } from '../test/dummy/dummyRanking';
import { dummyMonthRanking } from '../test/dummy/dummyRanking';

function objectToPromise<T>(obj: T): Promise<T> {
  return new Promise((resolve) => {
    resolve(obj);
  });
}

const UserService = {
  getUnsolvedUsers: async (bojId: string): Promise<UnsolvedUser[]> => {
    return objectToPromise([dummyUnsolvedUser]);
  },
};

const ProblemService = {
  updateUnsolvedProblems: async (userId: number, problemNumber: number): Promise<ProblemResponse[]> => {
    return objectToPromise([dummyProblem]);
  },
  getUnsolvedProblems: async (bojId: string): Promise<ProblemResponse[]> => {
    return objectToPromise([dummyProblem]);
  },
};

const RankingService = {
  getAllRanking: async (teamId: string): Promise<Ranking[]> => {
    return objectToPromise(dummyAllRanking);
  },
  getMonthRanking: async (teamId: string): Promise<Ranking[]> => {
    return objectToPromise(dummyMonthRanking);
  },
};

export { UserService, ProblemService, RankingService };
