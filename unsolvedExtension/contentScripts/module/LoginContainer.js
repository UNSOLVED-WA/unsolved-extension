import { useElement } from './useElement.js';
import { css } from './cssTable.js';

export const LoginContainer = function () {
  const [loginContainer, setLoginContainer] = useElement('div');
  const [loginButton, setLoginButton] = useElement('button');
  const [solvedLogo, setSolvedLogo] = useElement('img');
  const [message, setMessage] = useElement('span');

  setLoginContainer(setLoginContainerAttributes);
  setLoginButton(setLoginButtonAttributes);
  setSolvedLogo(setSolvedLogoAttributes);
  setMessage(setMessageAttributes);

  loginButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ message: 'toLogin' }, (response) => {
      console.log(response);
    });
  });

  loginButton.append(solvedLogo);
  loginButton.append(message);
  loginContainer.append(loginButton);

  return loginContainer;
};

function setLoginContainerAttributes(loginContainer) {
  loginContainer.classList.add(css['login']);
}

function setLoginButtonAttributes(loginButton) {
  loginButton.classList.add(css['loginButton']);
}

function setSolvedLogoAttributes(solvedLogo) {
  solvedLogo.classList.add(css['loginButtonLogo']);
  solvedLogo.src = 'https://static.solved.ac/res/logo-whitetext.svg';
}

function setMessageAttributes(message) {
  message.classList.add(css['loginButtonMessage']);
  message.innerHTML = '로그인하기';
}
