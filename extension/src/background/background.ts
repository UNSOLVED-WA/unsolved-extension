import { Request, SendResponse } from './types';
import API from '../api/api';
import { SolvedUser } from '../@types/SolvedUser';
import { UnsolvedUser } from '../@types/UnsolvedUser';
import { Scoring, Storage } from '../utils';
import { STORAGE_VALUE } from '../@types';

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
      chrome.storage.local.get('hideButton', (data) => {
        Storage.set('hideButton', !data.hideButton);
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
      Scoring.setState('RUNNING', request.data);
      break;
    case 'toCorrect':
      Storage.get(['solvedUser', 'problemId'], (res) => {
        const { solvedUser, problemId } = res;
        try {
          // TODO: 'user2' -> solvedUser.id로 바꿀 것
          API.UserService.getUnsolvedUser('user2').then((unsolvedUser: UnsolvedUser) => {
            API.ProblemService.updateUnsolvedProblems(unsolvedUser.id, parseInt(problemId)).then((res) => {
              Scoring.setState('CORRECT');
            });
          });
        } catch (e) {
          console.log(e);
        }
      });
      break;
  }
}

chrome.runtime.onMessage.addListener((request: Request, _, sendResponse: SendResponse) => {
  console.log(request.message);
  if (request.type === 'async') {
    asyncRequest(request, sendResponse);
    return true;
  }
  syncRequest(request);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ hideButton: false, problemNo: '', isClicked: false });
});
