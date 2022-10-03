function fetchUser(sendResponse) {
  fetch('https://solved.ac/api/v3/account/verify_credentials')
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then((data) => {
      chrome.storage.local.set({ solvedUser: data });
    })
    .then(() => {
      sendResponse({ message: 'success' });
    })
    .catch((error) => {
      console.log(error);
    });
}

async function fetchBadge() {
  const res = await fetch('https://mazassumnida.wtf/api/generate_badge?boj=rkskekzzz');
  if (res.status >= 400) {
    let badgePromise = new Promise((resolve, _) => {
      chrome.storage.local.get('badge', (data) => {
        resolve(data.badge);
      });
    });
    return await badgePromise;
  } else {
    const data = await res.text();
    chrome.storage.local.set({ badge: data });
    return data;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case 'fetchUser':
      fetchUser(sendResponse);
      sendResponse({ message: 'success' });
      break;
    case 'toLogin':
      chrome.tabs.create({
        url: 'https://solved.ac/',
      });
      sendResponse({ message: 'success' });
      break;
    case 'hideButton':
      const opt = {
        type: 'basic',
        title: 'Unsolved.WA',
        message: '문제풀 시간입니다.',
        iconUrl:
          'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008394/noticon/ohybolu4ensol1gzqas1.png',
      };
      chrome.notifications.create('helloworld', opt, (data) => {
        console.log(data);
      });
      chrome.storage.local.get('hideButton', (data) => {
        chrome.storage.local.set({ hideButton: !data.hideButton });
      });
    case 'fetchBadge':
      fetchBadge().then((data) => {
        sendResponse({ message: data });
      });
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
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ hideButton: false, submit: '' });
});
