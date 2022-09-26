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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'userStatus') {
    fetchUser(sendResponse);
    sendResponse({ message: 'success' });
  } else if (request.message === 'toLogin') {
    chrome.tabs.create({
      url: 'https://solved.ac/',
    });
    sendResponse({ message: 'success' });
  } else if (request.message === 'test') {
    fetchBadge().then((data) => {
      sendResponse({ message: data });
    });
    return true;
  }
});

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
