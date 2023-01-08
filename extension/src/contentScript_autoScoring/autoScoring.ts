import { MessageManager } from '../utils/message';
// import { Storage } from '../utils'; // 이거 왜 안됨?

function getSearchParam(key: string) {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  return searchParams.get(key);
}

function autoScoring() {
  const MAX_CHECK_TIME = 4000;
  const CHECK_INTERVAL = 1000;

  const checkPassed = () => {
    const result = document.querySelector('.result');
    if (result.children[0].innerHTML === '맞았습니다!!') {
      MessageManager.send({ message: 'CORRECT', type: 'sync', requestData: { problemId: getSearchParam('problem_id') } });
      clearInterval(intervalId);
      intervalId = null;
    } else if (!result.children[0].innerHTML.includes('채점') && !result.children[0].innerHTML.includes('기다')) {
      MessageManager.send({ message: 'WRONG', type: 'sync' });
      clearInterval(intervalId);
      intervalId = null;
    }
  };
  let intervalId = setInterval(checkPassed, CHECK_INTERVAL);
  setTimeout(() => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      MessageManager.send({ message: 'TIMEOUT', type: 'sync' });
    }
  }, MAX_CHECK_TIME);
}

if (window.location.pathname.includes('/status') && getSearchParam('from_mine') === '1') {
  chrome.storage.local.set({ isClicked: true });
  chrome.storage.local.get('scoring', (result) => {
    if (result.scoring.state === 'DEFAULT') {
      MessageManager.send({ message: 'RUNNING', type: 'sync' });
    }
    if (result.scoring.state === 'RUNNING') {
      autoScoring();
    }
  });
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.scoring && changes.scoring.newValue.state === 'RUNNING') {
      autoScoring();
    }
  });
}

if (window.location.pathname.includes('/submit')) {
  const button = document.querySelector('#submit_button');
  if (button) {
    button.addEventListener('click', () => {
      MessageManager.send({ message: 'RUNNING', type: 'sync' });
    });
  }
}
