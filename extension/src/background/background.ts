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

function fetchBadge(sendResponse: SendResponse) {
  fetch('https://mazassumnida.wtf/api/generate_badge?boj=rkskekzzz')
    .then((response) => {
      if (response.status >= 400) {
        return new Promise<string>((resolve, _) => {
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

// TODO : case를 비동기와 동기로 나누기( 비동기는 return true가 필요함 )
chrome.runtime.onMessage.addListener((request: Request, _, sendResponse: SendResponse) => {
  switch (request.message) {
    case 'fetchUser':
      fetchUser(sendResponse);
      return true;
    case 'fetchBadge':
      fetchBadge(sendResponse);
      return true;
    case 'submit':
      chrome.storage.local.get('submit', (data) => {
        if (data.submit !== '') {
          chrome.storage.local.set({ submit: '' });
          sendResponse({ message: 'success' });
        } else {
          sendResponse({ message: 'fail' });
        }
      });
      return true;
    case 'toLogin':
      chrome.tabs.create({
        url: 'https://solved.ac/',
      });
      break;
    case 'hideButton':
      chrome.storage.local.get('hideButton', (data) => {
        chrome.storage.local.set({ hideButton: !data.hideButton });
      });
    case 'sendNotification':
      const option = {
        type: 'basic',
        title: 'Unsolved.WA',
        message: '문제풀 시간입니다.',
        iconUrl:
          'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008394/noticon/ohybolu4ensol1gzqas1.png',
      };
      chrome.notifications.create('helloworld', option);
  }
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
