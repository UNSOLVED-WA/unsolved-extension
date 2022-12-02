import { UnsolvedUser } from '../@types/UnsolvedUser';
import { ProblemResponse } from '../@types/Problem';
import { Ranking } from '../@types/Ranking';

import { dummyUnsolvedUser } from '../test/dummy/dummyUser';
import { dummyProblem, dummyProblems } from '../test/dummy/dummyProblem';
import { dummyAllRanking, dummyMonthRanking } from '../test/dummy/dummyRanking';

function objectToPromise<T>(obj: T): Promise<T> {
  return new Promise((resolve) => {
    resolve(obj);
  });
}

const UserService = {
  getUnsolvedUsers: async (bojId: string): Promise<UnsolvedUser[]> => {
    console.log('mockAPI: getUnsolvedUsers : ', bojId);
    return objectToPromise([dummyUnsolvedUser]);
  },
};

const ProblemService = {
  updateUnsolvedProblems: async (userId: number, problemNumber: number): Promise<ProblemResponse[]> => {
    console.log('mockAPI: updateUnsolvedProblems : ', userId, problemNumber);
    return objectToPromise(dummyProblems);
  },
  getUnsolvedProblems: async (bojId: string): Promise<ProblemResponse[]> => {
    console.log('mockAPI: getUnsolvedProblems : ', bojId);
    return objectToPromise(dummyProblems);
  },
};

const RankingService = {
  getAllRanking: async (teamId: string): Promise<Ranking[]> => {
    console.log('mockAPI: getAllRanking : ', teamId);
    return objectToPromise(dummyAllRanking);
  },
  getMonthRanking: async (teamId: string): Promise<Ranking[]> => {
    console.log('mockAPI: getMonthRanking : ', teamId);
    return objectToPromise(dummyMonthRanking);
  },
};

export { UserService, ProblemService, RankingService };
