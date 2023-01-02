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
      const splitedURL = window.location.href.split('/');
      const problemNumber = splitedURL[splitedURL.indexOf('submit') + 1];
      Message.send({ message: 'toRunning', type: 'sync', data: problemNumber });
    });
  }
}

function autoScoring() {
  const MAX_CHECK_TIME = 4000;
  const CHECK_INTERVAL = 1000;

  const checkPassed = () => {
    const result = document.querySelector('.result');
    if (result.children[0].innerHTML === '맞았습니다!!') {
      Message.send({ message: 'toCorrect', type: 'sync' });
      clearInterval(intervalId);
      intervalId = null;
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
  if (typeof state === 'string' && state === 'RUNNING') {
    autoScoring();
  }
  if (typeof state !== 'string' && (state.scoringState.newValue === 'RUNNING' || state.scoringState === 'RUNNING')) {
    autoScoring();
  }
}

if (window.location.pathname.includes('/status')) {
  // Storage.get('scoringState', scoringIfRunning);
  chrome.storage.local.get('scoringState', scoringIfRunning);
  chrome.storage.onChanged.addListener(scoringIfRunning);
}
