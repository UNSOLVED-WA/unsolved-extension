import API from '../api/api';
import { ScoringManager, StorageManager } from '../utils';
import { STORAGE_VALUE, Request, SendResponse, SolvedUser } from '../@types';

function fetchCachedData(_: Error, key: keyof STORAGE_VALUE) {
  return StorageManager.get(key);
}

function fetchRanking(sendResponse: SendResponse<'fetchRanking'>, teamId: string) {
  API.RankingService.getAllRanking(teamId)
    .then((rankings) => {
      sendResponse({ state: 'success', responseData: { rankings } });
    })
    .catch((error) => {
      sendResponse({ state: 'fail', errorMessage: error.message });
    });
}

function fetchRecommands(sendResponse: SendResponse<'fetchRecommands'>, teamId: string, tier: number) {
  API.ProblemService.getUnsolvedProblems(teamId, tier)
    .then((problems) => {
      sendResponse({ state: 'success', responseData: { problems } });
    })
    .catch((error) => {
      sendResponse({ state: 'fail', errorMessage: error.message });
    });
}

function fetchRandomRecommand(sendResponse: SendResponse<'fetchRandomRecommand'>, teamId: string, tier: string) {
  API.ProblemService.getRecommandUnsolvedProblem(teamId, tier)
    .then((problems) => {
      sendResponse({ state: 'success', responseData: { problems } });
    })
    .catch((error) => {
      sendResponse({ state: 'fail', errorMessage: error.message });
    });
}

function fetchUser(sendResponse: SendResponse<'fetchUser'>) {
  API.ExternalService.getSolvedUsers()
    .then((data) => {
      StorageManager.set('solvedUser', data, (result) => {
        sendResponse({ state: 'success', responseData: { solvedUser: result } });
      });
    })
    .catch(async (error) => {
      try {
        const data = (await fetchCachedData(error, 'solvedUser')) as SolvedUser;
        sendResponse({ state: 'cached', responseData: { solvedUser: data } });
      } catch {
        sendResponse({ state: 'fail', errorMessage: error.message });
      }
    });
}

function fetchBadge(sendResponse: SendResponse<'fetchBadge'>) {
  StorageManager.get('solvedUser', (result) => {
    API.ExternalService.getBojBadge(result.user.handle)
      .then((badge) => {
        StorageManager.set('badge', badge, () => {
          sendResponse({ state: 'success', responseData: { badge } });
        });
      })
      .catch(async (error) => {
        try {
          const badge = (await fetchCachedData(error, 'badge')) as string;
          sendResponse({ state: 'cached', responseData: { badge } });
        } catch {
          sendResponse({ state: 'fail', errorMessage: error.message });
        }
      });
  });
}

function asyncRequest(request: Request, sendResponse: SendResponse) {
  switch (request.message) {
    case 'fetchUser':
      fetchUser(sendResponse);
      break;
    case 'fetchBadge':
      fetchBadge(sendResponse);
      break;
    case 'fetchRanking':
      fetchRanking(sendResponse, request.requestData.teamId);
      break;
    case 'fetchRecommands':
      fetchRecommands(sendResponse, request.requestData.teamId, request.requestData.tier);
      break;
    case 'fetchRandomRecommand':
      fetchRandomRecommand(sendResponse, request.requestData.teamId, request.requestData.tier);
      break;
  }
}

function syncRequest(request: Request) {
  switch (request.message) {
    case 'toLogin':
      chrome.tabs.create({
        url: 'https://solved.ac/',
      });
      break;
    case 'hideButton':
      StorageManager.get('hideButton', (result) => {
        StorageManager.set('hideButton', !result);
      });
      break;
    case 'sendNotification':
      chrome.notifications.create('helloworld', {
        type: 'basic',
        title: 'Unsolved.WA',
        message: '문제풀 시간입니다.',
        iconUrl: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008394/noticon/ohybolu4ensol1gzqas1.png',
      });
      break;
    case 'toRedirectProblem':
      chrome.tabs.create({
        url: `https://www.acmicpc.net/problem/${request.requestData.problemId}`,
      });
      break;
    case 'toRedirectUser':
      chrome.tabs.create({
        url: `https://www.acmicpc.net/user/${request.requestData.bojId}`,
      });
      break;
    case 'RUNNING':
      ScoringManager.set('RUNNING');
      break;
    case 'WRONG':
      ScoringManager.set('WRONG');
      break;
    case 'TIMEOUT':
      ScoringManager.set('TIMEOUT');
      break;
    case 'CORRECT':
      StorageManager.get('solvedUser', async (solvedUser) => {
        // TODO : <high> 'user2' -> solvedUser.user.handle
        API.ProblemService.updateUnsolvedProblems('user2', parseInt(request.requestData.problemId))
          .then((result) => {
            ScoringManager.set('CORRECT', null, result[0] ? result[0].score : 0);
          })
          .catch((error) => {
            ScoringManager.set('NETERROR', request.requestData.problemId, -1);
          });
      });
      break;
  }
}

chrome.runtime.onMessage.addListener((request: Request, _, sendResponse: SendResponse) => {
  if (request.type === 'async') {
    asyncRequest(request, sendResponse);
    return true;
  }
  syncRequest(request);
});

chrome.runtime.onInstalled.addListener(() => {
  StorageManager.sets({
    hideButton: false,
    isClicked: false,
    scoring: {
      problemId: '',
      state: 'DEFAULT',
      score: -1,
    },
  });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-buttom') {
    StorageManager.get('hideButton', (result) => {
      StorageManager.set('hideButton', !result);
    });
  }
});
