// background.js
async function getCookie() {
  const domain = 'solved.ac';

  let solvedACtoken = null;
  const cookies = await chrome.cookies.getAll({ domain });
  for (const cookie of cookies) {
    if (cookie.name === 'solvedacToken') {
      solvedACtoken = cookie;
      break;
    }
  }
  if (!solvedACtoken) return false;
  await chrome.storage.local.set({ solvedacToken: solvedACtoken.value }, () => {
    console.log('Stored name: ' + solvedACtoken.value);
  });
  return true;
}

function isLogedIn(sendResponse) {
  chrome.storage.local.get(['solvedacToken'], (response) => {
    const error = chrome.runtime.lastError;
    if (error) console.log(error);

    if (!response.solvedacToken) {
      if (getCookie()) {
        sendResponse({ message: 'login' });
      } else {
        sendResponse({ message: 'redirect' });
      }
    } else {
      console.log(response.solvedacToken);
      sendResponse({ message: 'success' });
    }
  });
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'userStatus') {
    isLogedIn(sendResponse);
    return true;
  }
});
