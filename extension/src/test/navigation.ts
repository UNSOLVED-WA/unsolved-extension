chrome.runtime.sendMessage({ message: 'checkTodaySolve' }, (response) => {
  if (response.message === 'fail') {
    window.location.href = 'https://www.acmicpc.net/';
  }
});
