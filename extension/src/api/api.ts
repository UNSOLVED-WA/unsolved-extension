import {
  ProblemResponse,
  ProblemRequest,
  UnsolvedUser,
  Ranking,
  SolvedUser,
  Team,
  SolvedUserRequest,
  Solved,
  Organization,
} from '../@types';
import * as mockAPI from './mockapi';

// const UNSOLVED_BASE_URL = 'https://heyinsa.kr/unsolved';
const UNSOLVED_BASE_URL = 'http://localhost:8080';
const SOLVED_URL = 'https://solved.ac/api/v3';
const BOJBADGE_URL = 'https://mazassumnida.wtf/api/v2/generate_badge?boj=';

const convertURL = (strings: string[]) => strings.join('/');

export class NoContentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoContentError';
  }
}

export class ServerSideError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerSideError';
  }
}

export class InvalidRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidRequestError';
  }
}

function responseStatusCheck(response: Response) {
  switch (true) {
    case response.status === 200:
      return response;
    case response.status === 204:
      throw new NoContentError('No Content');
    case response.status >= 500:
      throw new ServerSideError('Server error');
    case response.status >= 400:
      throw new InvalidRequestError('Invalid request');
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

async function serviceInterface<T, Body = any>(url: string, method: string, body?: Body, type = 'json'): Promise<T> {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options['body'] = JSON.stringify(body);
  return fetch(url, options)
    .then(responseStatusCheck)
    .then((response) => setResponseType(response, type));
}

const UserService = {
  fetchUnsolvedUser: async (bojId: string) => {
    return serviceInterface<UnsolvedUser>(convertURL([UNSOLVED_BASE_URL, 'users', bojId]), 'GET');
  },
  createUnsolvedUser: async (handle: string, solved: Solved[]) => {
    return serviceInterface<UnsolvedUser, SolvedUserRequest>(convertURL([UNSOLVED_BASE_URL, 'users', handle]), 'POST', {
      handle,
      solved,
    });
  },
};

const TeamService = {
  getTeamByTeamName: async (teamName: string) => {
    return serviceInterface<Team>(convertURL([UNSOLVED_BASE_URL, 'teams', 'name', teamName]), 'GET');
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
   * unsolved 리스트 조회(?) // TODO: <low> backend에서 어떤 문제 리스트를 보내주는지 알려줘야함(티어에 맞는 문제만 보내주는건지)
   * @param teamName
   * @param tier
   * @returns 문제 리스트
   */
  getUnsolvedProblems: async (teamName: string, tier: number) => {
    return serviceInterface<ProblemResponse[]>(convertURL([UNSOLVED_BASE_URL, 'problems', 'unsolved', teamName, tier.toString()]), 'GET');
  },
  /**
   * 특정 티어의 문제 하나를 추천 받기
   * @param teamName
   * @param tier
   * @returns 추천 문제
   */
  getRecommandUnsolvedProblem: async (teamName: string, tier: string) => {
    return serviceInterface<ProblemResponse>(convertURL([UNSOLVED_BASE_URL, 'problems', 'unsolved', 'random', teamName, tier]), 'GET');
  },
  // 유저 점수 받아오는 api 추가 예정
};

const RankingService = {
  /**
   * 랭킹 전체 조회
   * @param teamName
   * @returns
   */
  getAllRanking: async (teamName: string) => {
    return serviceInterface<Ranking[]>(convertURL([UNSOLVED_BASE_URL, 'rankings', teamName]), 'GET');
  },
  /**
   * 월간 랭킹
   * @param teamName
   * @returns
   */
  getMonthRanking: async (teamName: string) => {
    return serviceInterface<Ranking[]>(convertURL([UNSOLVED_BASE_URL, 'rankings', 'month', teamName]), 'GET');
  },
  // TODO: <low> 월간 랭킹 히스토리 조회 api 추가 예정??
};

const ExternalService = {
  getSolvedUsers: async () => {
    return serviceInterface<SolvedUser>(convertURL([SOLVED_URL, '/account/verify_credentials']), 'GET');
  },
  getOrganizationByHandle: async (handle: string) => {
    return serviceInterface<Organization[]>(convertURL([SOLVED_URL, `/user/organizations?handle=${handle}`]), 'GET');
  },
  getBojBadge: async (bojId: string) => {
    return serviceInterface<string>(BOJBADGE_URL + bojId, 'GET', null, 'text');
  },
};

const prodAPI = {
  UserService,
  TeamService,
  ProblemService,
  RankingService,
  ExternalService,
};

const API = process.env.NODE_ENV === 'development' ? { ...mockAPI, ExternalService } : prodAPI;

export default API;
