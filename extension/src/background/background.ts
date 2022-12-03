import { Request, SendResponse } from './types';
import API from '../api/api';

function fetchCachedData(_: Error, key: string) {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result[key]);
    });
  });
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

function fetchUser(sendResponse: SendResponse) {
  API.ExternalService.getSolvedUsers()
    .then((data) => {
      chrome.storage.local.set({ solvedUser: data }, () => {
        if (chrome.runtime.lastError) {
          throw new Error('storage.local.set error');
        }
        sendResponse({ state: 'success', data });
      });
    })
    .catch(async (error) => {
      try {
        const data = await fetchCachedData(error, 'user');
        sendResponse({ state: 'cached', data });
      } catch {
        sendResponse({ state: 'fail', message: error.message });
      }
    });
}

function fetchBadge(sendResponse: SendResponse) {
  chrome.storage.local.get('solvedUser', (result) => {
    API.ExternalService.getBojBadge(result.solvedUser.user.handle)
      .then((data) => {
        chrome.storage.local.set({ badge: data }, () => {
          if (chrome.runtime.lastError) {
            throw new Error('storage.local.set error');
          }
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
