import { ProblemResponse, ProblemRequest, UnsolvedUser, Ranking, SolvedUser } from '../@types';
import * as mockAPI from './mockapi';

const UNSOLVED_BASE_URL = 'https://heyinsa.kr/unsolved';
const SOLVED_URL = 'https://solved.ac/api/v3/account/verify_credentials';
const BOJBADGE_URL = 'https://mazassumnida.wtf/api/v2/generate_badge?boj=';

const convertURL = (strings: string[]) => strings.join('/');

function responseStatusCheck(response: Response) {
  switch (true) {
    case response.status === 200:
      return response;
    case response.status >= 500:
      throw new Error('Server error');
    case response.status >= 400:
      throw new Error('Invalid request');
    default:
      throw new Error('Unknown error');
  }
}

function setResponseType(response: Response, type = 'json') {
  switch (type) {
    case 'json':
      return response.json();
    case 'text':
      return response.text();
    default:
      return response;
  }
}

async function serviceInterface<T>(url: string, method: string, body?: any, type = 'json'): Promise<T> {
  return fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(responseStatusCheck)
    .then((response) => setResponseType(response, type));
}

const UserService = {
  getUnsolvedUser: async (bojId: string) => {
    return serviceInterface<UnsolvedUser>(convertURL([UNSOLVED_BASE_URL, 'users', bojId]), 'GET');
  },
};

const ProblemService = {
  /**
   * 해결한 문제를 unsolved 서버에 전송후 score 받기
   * @param userId
   * @param problemNumber
   * @returns 그룹랭킹 상승에 기여한 score
   */
  updateUnsolvedProblems: async (userId: string, problemNumber: number) => {
    const body: ProblemRequest = {
      bojId: userId,
      problemNumber: problemNumber,
    };
    return serviceInterface<ProblemResponse[]>(convertURL([UNSOLVED_BASE_URL, 'problems', 'solving']), 'POST', body);
  },
  /**
   * unsolved 리스트 조회(?) // TODO: backend에서 어떤 문제 리스트를 보내주는지 알려줘야함(티어에 맞는 문제만 보내주는건지)
   * @param teamId
   * @param tier
   * @returns 문제 리스트
   */
  getUnsolvedProblems: async (teamId: string, tier: string) => {
    return serviceInterface<ProblemResponse[]>(convertURL([UNSOLVED_BASE_URL, 'problems', 'unsolved', teamId, tier]), 'GET');
  },
  /**
   * 특정 티어의 문제 하나를 추천 받기
   * @param teamId
   * @param tier
   * @returns 추천 문제
   */
  getRecommandUnsolvedProblem: async (teamId: string, tier: string) => {
    return serviceInterface<ProblemResponse[]>(convertURL([UNSOLVED_BASE_URL, 'problems', 'unsolved', 'random', teamId, tier]), 'GET');
  },
  // 유저 점수 받아오는 api 추가 예정
};

const RankingService = {
  /**
   * 랭킹 전체 조회
   * @param teamId
   * @returns
   */
  getAllRanking: async (teamId: string) => {
    return serviceInterface<Ranking[]>(convertURL([UNSOLVED_BASE_URL, 'rankings', teamId]), 'GET');
  },
  /**
   * 월간 랭킹
   * @param teamId
   * @returns
   */
  getMonthRanking: async (teamId: string) => {
    return serviceInterface<Ranking[]>(convertURL([UNSOLVED_BASE_URL, 'rankings', 'month', teamId]), 'GET');
  },
  // TODO: 월간 랭킹 히스토리 조회 api 추가 예정??
};

const ExternalService = {
  getSolvedUsers: async () => {
    return serviceInterface<SolvedUser>(SOLVED_URL, 'GET');
  },
  getBojBadge: async (bojId: string) => {
    return serviceInterface<string>(BOJBADGE_URL + bojId, 'GET', null, 'text');
  },
};

const prodAPI = {
  UserService,
  ProblemService,
  RankingService,
  ExternalService,
};

const API = process.env.NODE_ENV === 'development' ? { ...mockAPI, ExternalService } : prodAPI;

export default API;
