// background.js

async function fetchUser(sendResponse) {
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
      chrome.storage.local.get('solvedUser', (result) => {
        // console.log('solvedUser : ' + JSON.stringify(result));
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'userStatus') {
    fetchUser(sendResponse);
    sendResponse({ message: 'success' });
    return true;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'toLogin') {
    chrome.tabs.create({
      url: 'https://solved.ac/',
    });
    sendResponse({ message: 'success' });
    return true;
  }
});
