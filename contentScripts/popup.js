// const message = document.getElementById('message');
// const button = document.getElementById('go');

// button.addEventListener('click', handleFormSubmit);

chrome.runtime.sendMessage(
  {
    message: 'userStatus',
  },
  (response) => {
    if (response.message === 'success') {
      console.log('로그인 성공');
    } else if (response.message === 'login') {
      console.log('로그인하세요');
    } else if (response.message === 'redirect') {
      window.location.href = 'https://solved.ac'; // TODO 새탭 만들어서 리다이렉팅으로 변경하기
    }
  }
);
