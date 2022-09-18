// const message = document.getElementById('message');
const button = document.getElementById('go');

button.addEventListener('click', handleFormSubmit);

function handleFormSubmit(e) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: 'hideButton' }, (response) => {
      console.log(response);
    });
  });
}

chrome.runtime.sendMessage(
  {
    message: 'userStatus',
  },
  (response) => {
    console.log(response);
    if (response.message === 'success') {
      window.location.href = 'https://www.google.com';
    } else if (response.message === 'login') {
      console.log('로그인하세요');
    } else if (response.message === 'redirect') {
      window.location.href = 'https://solved.ac'; // TODO 새탭 만들어서 리다이렉팅으로 변경하기
    }
  }
);
