import { UnsolvedUser } from '../@types/UnsolvedUser';
import { ProblemResponse, ProblemRequest } from '../@types/Problem';
import { Ranking } from '../@types/Ranking';

import * as mockAPI from './mockapi';

const url = 'https://heyinsa.kr/unsolved/';

const convertURL = (strings: string[]) => strings.join('/');

async function serviceInterface(url: string, method: string, body?: any) {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
  });
  return response.json();
}

const UserService = {
  getUnsolvedUsers: async (bojId: string): Promise<UnsolvedUser[]> => {
    return serviceInterface(convertURL([url, 'users', bojId]), 'GET');
  },
};

const ProblemService = {
  updateUnsolvedProblems: async (userId: number, problemNumber: number): Promise<ProblemResponse[]> => {
    const body: ProblemRequest = {
      userId: userId,
      problemNumber: problemNumber,
    };
    return serviceInterface(convertURL([url, 'problems']), 'POST', body);
  },
  getUnsolvedProblems: async (teamId: string, tier: string): Promise<ProblemResponse[]> => {
    return serviceInterface(convertURL([url, 'problems', teamId, tier]), 'GET');
  },
  // 유저 점수 받아오는 api 추가 예정
};

const RankingService = {
  getAllRanking: async (teamId: string): Promise<Ranking[]> => {
    return serviceInterface(convertURL([url, 'ranking', teamId]), 'GET');
  },
  getMonthRanking: async (teamId: string): Promise<Ranking[]> => {
    return serviceInterface(convertURL([url, 'ranking', teamId, 'month']), 'GET');
  },
};

const API = process.env.NODE_ENV === 'development' ? mockAPI : { UserService, ProblemService, RankingService };

export default API;
