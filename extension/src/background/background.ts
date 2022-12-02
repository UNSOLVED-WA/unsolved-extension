import { Request, SendResponse } from './types';
import { SolvedUser } from '../@types/SolvedUser';
import API from '../api/api';

function responseStatusCheck(response: Response, returnType: 'json' | 'text') {
  switch (true) {
    case response.status === 200:
      return response[returnType]();
    case response.status >= 500:
      throw new Error('Server error');
    case response.status >= 400:
      throw new Error('Invalid request');
    default:
      throw new Error('Unknown error');
  }
}

function fetchCachedData(_: Error, key: string) {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result[key]);
    });
  });
}

function fetchUser(sendResponse: SendResponse) {
  fetch('https://solved.ac/api/v3/account/verify_credentials')
    .then((response) => responseStatusCheck(response, 'json'))
    .catch((error: Error) => fetchCachedData(error, 'solvedUser'))
    .then((data) => {
      chrome.storage.local.set({ solvedUser: data }, () => {
        if (chrome.runtime.lastError) {
          throw new Error('storage.local.set error');
        }
        sendResponse({ state: 'success', data });
      });
    })
    .catch((error: Error) => {
      sendResponse({ state: 'fail', message: error.message });
    });
}

function fetchBadge(sendResponse: SendResponse) {
  chrome.storage.local.get('solvedUser', (result) => {
    fetch(`https://mazassumnida.wtf/api/generate_badge?boj=${result.solvedUser.user.handle}`)
      .then((response) => responseStatusCheck(response, 'text'))
      .catch((error: Error) => fetchCachedData(error, 'badge'))
      .then((data) => {
        chrome.storage.local.set({ badge: data }, () => {
          if (chrome.runtime.lastError) {
            throw new Error('storage.local.set error');
          }
          sendResponse({ state: 'success', data: data });
        });
      })
      .catch((error: Error) => {
        sendResponse({ state: 'fail', message: error.message });
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
    case 'submit':
      chrome.storage.local.get('submit', (data) => {
        if (data.submit !== '') {
          chrome.storage.local.set({ submit: '' });
          sendResponse({ state: 'success' });
        } else {
          sendResponse({ state: 'fail' });
        }
      });
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
        chrome.storage.local.set({ hideButton: !data.hideButton });
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
  }
}

// TODO : case를 비동기와 동기로 나누기( 비동기는 return true가 필요함 )
chrome.runtime.onMessage.addListener((request: Request, _, sendResponse: SendResponse) => {
  if (request.type === 'async') {
    asyncRequest(request, sendResponse);
    return true;
  }
  syncRequest(request);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ hideButton: false, submit: '' });
});

// async function test() {
//   const testUser = await API.UserService.getUnsolvedUsers('rkskekzzz');
//   const testUpdate = await API.ProblemService.updateUnsolvedProblems(1, 1);
//   const testProblem = await API.ProblemService.getUnsolvedProblems('42seoul', 'gold');
//   const testAllRank = await API.RankingService.getAllRanking('42seoul');
//   const testMonthRank = await API.RankingService.getMonthRanking('42seoul');

//   console.log(testUser);
//   console.log(testUpdate);
//   console.log(testProblem);
//   console.log(testAllRank);
//   console.log(testMonthRank);
// }
