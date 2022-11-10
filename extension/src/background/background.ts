import { Request, SendResponse } from './messageTypes';
import { SolvedUser } from '../@types/SolvedUser';
import API from '../api/api';

function fetchUser(sendResponse: SendResponse) {
  fetch('https://solved.ac/api/v3/account/verify_credentials')
    .then((response) => (response.status === 200 ? response.json() : Promise.reject(new Error('Not logged in'))))
    .then((data) => {
      chrome.storage.local.set({ solvedUser: data });
      sendResponse({ message: 'success' });
    })
    .catch(() => {
      sendResponse({ message: 'fail' });
    });
}

function fetchBadge(sendResponse: SendResponse, bojId: string) {
  fetch(`https://mazassumnida.wtf/api/generate_badge?boj=${bojId}`)
    .then((response) => {
      if (response.status >= 400) {
        return new Promise((resolve) => {
          // TODO: Promise typeError
          chrome.storage.local.get('badge', (data) => {
            resolve(data.badge);
          });
        });
      } else {
        return response.text();
      }
    })
    .then((badgeElement) => {
      chrome.storage.local.set({ badge: badgeElement });
      sendResponse({ message: 'success', data: badgeElement });
    });
}

function asyncRequest(request: Request, sendResponse: SendResponse): boolean {
  switch (request.message) {
    case 'fetchUser':
      fetchUser(sendResponse);
      break;
    case 'fetchBadge':
      fetchBadge(sendResponse, 'mosong');
      break;
    case 'submit':
      chrome.storage.local.get('submit', (data) => {
        if (data.submit !== '') {
          chrome.storage.local.set({ submit: '' });
          sendResponse({ message: 'success' });
        } else {
          sendResponse({ message: 'fail' });
        }
      });
      break;
  }
  return true;
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
  console.info(request);
  if (request.type === 'async') return asyncRequest(request, sendResponse);
  else if (request.type === 'sync') return syncRequest(request); // return undefined
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
