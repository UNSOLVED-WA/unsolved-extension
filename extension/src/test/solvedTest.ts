if (window.location.pathname.includes('/submit')) {
  const button = document.querySelector('#submit_button');
  if (button) {
    button.addEventListener('click', () => {
      const splitedURL = window.location.href.split('/');
      const problemNumber = splitedURL[splitedURL.indexOf('submit') + 1];
      chrome.storage.local.set({ submit: problemNumber });
    });
  }
}

if (window.location.pathname.includes('/status')) {
  const MAX_CHECK_TIME = 30000;
  const CHECK_INTERVAL = 1000;

  const result = document.querySelector('.result');

  const checkPassed = () => {
    if (result.children[0].innerHTML === '맞았습니다!!') {
      chrome.runtime.sendMessage({ message: 'submit', type: 'async' }, (response) => {
        if (response.state === 'success') {
          // TODO: insert re-rendering code
        }
      });

      clearInterval(monitoring);
      clearTimeout(limitTime);
    }
  };
  const limitTime = setTimeout(checkPassed, MAX_CHECK_TIME);
  const monitoring = setInterval(checkPassed, CHECK_INTERVAL);
}
