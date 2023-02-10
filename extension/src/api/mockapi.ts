import { UnsolvedUser, ProblemResponse, Ranking, Team, Solved } from '../@types';

import { dummyUnsolvedUser } from '../test/dummy/dummyUser';
import { dummyUpdateProblems, dummyProblems, dummyProblem } from '../test/dummy/dummyProblem';
import { dummyAllRanking, dummyMonthRanking } from '../test/dummy/dummyRanking';
import { dummyTeam } from '../test/dummy/dummyTeam';

function objectToPromise<T>(obj: T): Promise<T> {
  return new Promise((resolve) => {
    resolve(obj);
  });
}

const UserService = {
  getUnsolvedUser: async (bojId: string): Promise<UnsolvedUser> => {
    console.log('mockAPI: getUnsolvedUser : ', bojId);
    return objectToPromise(dummyUnsolvedUser);
  },
  createUser: async (handle: string, organizationIds: number[], solved: Solved[]): Promise<void> => {
    console.log('mockAPI: createUser : ', handle, organizationIds, solved);
    return new Promise(null);
  },
};

const TeamService = {
  getTeamByTeamName: async (teamName: string): Promise<Team> => {
    console.log('mockAPI: getTeamByTeamName : ', teamName);
    return objectToPromise(dummyTeam);
  },
};

const ProblemService = {
  updateUnsolvedProblems: async (userId: string, problemNumber: number): Promise<ProblemResponse[]> => {
    console.log('mockAPI: updateUnsolvedProblems : ', userId, problemNumber);
    return objectToPromise(dummyUpdateProblems);
  },
  getUnsolvedProblems: async (bojId: string, tier: number): Promise<ProblemResponse[]> => {
    console.log('mockAPI: getUnsolvedProblems : ', bojId, tier);
    return objectToPromise(dummyProblems);
  },
  getRecommandUnsolvedProblem: async (bojId: string, tier: string) => {
    console.log('mockAPI: getRecommandUnsolvedProblem : ', bojId, tier);
    return objectToPromise(dummyProblem);
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

export { UserService, TeamService, ProblemService, RankingService };
