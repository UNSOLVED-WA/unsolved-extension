import { Message } from '../utils/message';
import { Storage } from '../utils'; // 이거 왜 안됨?
import { SCORING_STATE } from '../@types';

type StorageChange = {
  [key: string]: chrome.storage.StorageChange;
};
type StorageGet = {
  [key: string]: any;
};

if (window.location.pathname.includes('/submit')) {
  const button = document.querySelector('#submit_button');
  if (button) {
    button.addEventListener('click', () => {
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.search);
      const problemId = searchParams.get('problem_id');
      Message.send({ message: 'toRunning', type: 'sync', data: problemId });
    });
  }
}

function autoScoring() {
  const MAX_CHECK_TIME = 4000;
  const CHECK_INTERVAL = 1000;

  const checkPassed = () => {
    const result = document.querySelector('.result');
    if (result.children[0].innerHTML === '맞았습니다!!') {
      clearInterval(intervalId);
      intervalId = null;
      Message.send({ message: 'toCorrect', type: 'sync' });
    }
  };
  let intervalId = setInterval(checkPassed, CHECK_INTERVAL);
  setTimeout(() => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      Message.send({ message: 'TIMEOUT', type: 'sync' });
    }
  }, MAX_CHECK_TIME);
}

function scoringIfRunning(state: StorageChange | StorageGet | SCORING_STATE) {
  if (typeof state === 'object' && state?.scoringState === 'DEFAULT') {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const problemId = searchParams.get('problem_id');
    Message.send({ message: 'toRunning', type: 'sync', data: problemId });
    return;
  }
  if (
    (typeof state === 'string' && state === 'RUNNING') ||
    (typeof state !== 'string' && (state?.scoringState?.newValue === 'RUNNING' || state?.scoringState === 'RUNNING'))
  ) {
    autoScoring();
  }
}

if (window.location.pathname.includes('/status')) {
  chrome.storage.local.set({ isClicked: true });
  chrome.storage.local.get('scoringState', scoringIfRunning);
  chrome.storage.onChanged.addListener(scoringIfRunning);
}