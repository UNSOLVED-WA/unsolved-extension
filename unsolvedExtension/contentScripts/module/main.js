import { useElement, removeElementFromDom, getElement } from './useElement.js';
import { LoginContainer } from './LoginContainer.js';
import { ContentContainer } from './ContentContainer.js';
import { css } from './cssTable.js';

function PanelElement() {
  const [panel, setPanel] = useElement('div');
  const contentContainer = ContentContainer();
  const loginContainer = LoginContainer();

  setPanel(setPanelAttributes);

  chrome.runtime.sendMessage({ message: 'userStatus' }, (response) => {
    chrome.storage.local.get('solvedUser', (result) => {
      if (result.solvedUser) {
        panel.append(contentContainer);
      } else {
        panel.append(loginContainer);
      }
    });
  });

  return panel;
}

export const main = () => {
  function render() {
    removeElementFromDom();
    chrome.runtime.sendMessage({ message: 'test' }, (response) => {
      console.log(response);
    });

    const [button, setButton] = useElement('button');
    const [unsolvedLogo, setUnsolvedLogo] = useElement('span');

    setButton(setButtonAttributes);
    setUnsolvedLogo(setUnsolvedLogoAttributes);

    button.addEventListener('click', (e) => handleUnsolvedFloatButton(e, unsolvedLogo));
    window.addEventListener('click', (e) => handleOutsideClick(e, button, unsolvedLogo));

    button.append(unsolvedLogo);
    /* 최종 렌더링 */
    document.body.append(button);
  }

  function handleDisplay() {
    const button = document.querySelector('.' + css['unwaButton']);
    if (!button) return;
    if (button.style.display === 'none') {
      button.style.display = '';
    } else {
      button.style.display = 'none';
    }
  }

  return { render, handleDisplay };
};

/* Element event handler */
function handleUnsolvedFloatButton(e, unsolvedLogo) {
  if (e.currentTarget.classList.contains(css['clicked'])) {
    return;
  } else {
    const panel = PanelElement();

    e.currentTarget.classList.add(css['clicked']);
    unsolvedLogo.style.display = 'none';

    e.currentTarget.append(panel);
  }
}

function handleOutsideClick(e, button, unsolvedLogo) {
  if (button.contains(e.target)) {
    return;
  } else {
    const unsolvedPanel = document.querySelector('.' + css['unwaPanel']);
    if (unsolvedPanel) unsolvedPanel.remove();
    button.classList.remove(css['clicked']);
    unsolvedLogo.style.display = '';
  }
}

/* Element Attributes */
function setUnsolvedLogoAttributes(unsolvedLogo) {
  unsolvedLogo.innerHTML = 'WA';
  unsolvedLogo.classList.add(css['unwaLogo']);
}

function setPanelAttributes(panel) {
  panel.classList.add(css['unwaPanel']);
  panel.style.display = 'flex';
}

function setButtonAttributes(button) {
  button.classList.add(css['unwaButton']);
}
