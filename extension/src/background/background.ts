import API from '../api/api';
import { ScoringManager, Storage } from '../utils';
import { STORAGE_VALUE, Request, SendResponse } from '../@types';

function fetchCachedData(_: Error, key: keyof STORAGE_VALUE) {
  return Storage.get(key);
}

function fetchRanking(sendResponse: SendResponse, teamId: string) {
  API.RankingService.getAllRanking(teamId)
    .then((data) => {
      sendResponse({ state: 'success', data });
    })
    .catch((error) => {
      sendResponse({ state: 'fail', message: error.message });
    });
}

function fetchRecommand(sendResponse: SendResponse, teamId: string, tier: string) {
  API.ProblemService.getUnsolvedProblems(teamId, tier)
    .then((data) => {
      sendResponse({ state: 'success', data });
    })
    .catch((error) => {
      sendResponse({ state: 'fail', message: error.message });
    });
}

function fetchUser(sendResponse: SendResponse) {
  API.ExternalService.getSolvedUsers()
    .then((data) => {
      Storage.set('solvedUser', data, (result) => {
        sendResponse({ state: 'success', data: result });
      });
    })
    .catch(async (error) => {
      try {
        const data = await fetchCachedData(error, 'solvedUser');
        sendResponse({ state: 'cached', data });
      } catch {
        sendResponse({ state: 'fail', message: error.message });
      }
    });
}

function fetchBadge(sendResponse: SendResponse) {
  Storage.get('solvedUser', (result) => {
    API.ExternalService.getBojBadge(result.user.handle)
      .then((data) => {
        Storage.set('badge', data, () => {
          sendResponse({ state: 'success', data });
        });
      })
      .catch(async (error) => {
        try {
          const data = await fetchCachedData(error, 'badge');
          sendResponse({ state: 'cached', data });
        } catch {
          sendResponse({ state: 'fail', message: error.message });
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
      fetchRanking(sendResponse, request.data);
      break;
    case 'fetchRecommand':
      fetchRecommand(sendResponse, request.data.teamId, request.data.tier);
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
      Storage.get('hideButton', (result) => {
        Storage.set('hideButton', !result);
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
        url: `https://www.acmicpc.net/problem/${request.data}`,
      });
      break;
    case 'toRedirectUser':
      chrome.tabs.create({
        url: `https://www.acmicpc.net/user/${request.data}`,
      });
      break;
    case 'toRunning':
      ScoringManager.set('RUNNING', request.data, -1);
      break;
    case 'WRONG':
      ScoringManager.set('WRONG');
      break;
    case 'TIMEOUT':
      ScoringManager.set('TIMEOUT');
      break;
    case 'toCorrect':
      Storage.gets(['solvedUser', 'scoring'], async (res) => {
        const {
          solvedUser,
          scoring: { problemId },
        } = res;
        try {
          // TODO: 'user2' -> solvedUser.id로 바꿀 것
          const unsolvedUser = await API.UserService.getUnsolvedUser('user2');
          const result = await API.ProblemService.updateUnsolvedProblems(unsolvedUser.bojId, parseInt(problemId));
          ScoringManager.set('CORRECT', null, result[0] ? result[0].score : 0);
        } catch (e) {
          ScoringManager.set('NETERROR');
        }
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
  Storage.sets({
    hideButton: false,
    isClicked: false,
    scoring: {
      problemId: '',
      state: 'DEFAULT',
      score: -1,
    },
  });
});
