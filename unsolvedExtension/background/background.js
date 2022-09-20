// background.js

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
    return true;
  } else if (request.message === 'toLogin') {
    chrome.tabs.create({
      url: 'https://solved.ac/',
    });
    sendResponse({ message: 'success' });
    return true;
  }
});
