import { useElement } from './useElement.js';
import { LoginContainer } from './LoginContainer.js';
import { ContentContainer } from './ContentContainer.js';
import { css } from './cssTable.js';

function PanelElement() {
  const [panel, setPanel] = useElement('div');

  setPanel(setPanelAttributes);

  chrome.storage.local.get('solvedUser', (result) => {
    if (result.solvedUser) {
      panel.append(ContentContainer);
    } else {
      panel.append(LoginContainer);
    }
  });

  return panel;
}

export const main = () => {
  let displayState = true;
  const [button, setButton] = useElement('button');
  const [unsolvedLogo, setUnsolvedLogo] = useElement('span');
  const panel = PanelElement();

  function render() {
    setButton(setButtonAttributes);
    setUnsolvedLogo(setUnsolvedLogoAttributes);

    button.addEventListener('click', (e) => handleUnsolvedFloatButton(e, panel, unsolvedLogo));
    window.addEventListener('click', (e) => handleOutsideClick(e, button, panel, unsolvedLogo));

    button.append(unsolvedLogo);
    button.append(panel);

    /* 최종 렌더링 */
    document.body.append(button);
  }

  function handleDisplay() {
    button.style.display = displayState ? 'none' : '';
    displayState = !displayState;
  }

  return { render, handleDisplay };
};

/* Element event handler */
function handleUnsolvedFloatButton(e, panel, unsolvedLogo) {
  if (e.currentTarget.classList.contains(css['clicked'])) {
    return;
  } else {
    e.currentTarget.classList.add(css['clicked']);
    panel.style.display = 'flex';
    unsolvedLogo.style.display = 'none';
  }
}

function handleOutsideClick(e, button, panel, unsolvedLogo) {
  if (button.contains(e.target)) {
    return;
  } else {
    button.classList.remove(css['clicked']);
    panel.style.display = 'none';
    unsolvedLogo.style.display = '';
  }
}

/* Element Attributes */
function setUnsolvedLogoAttributes(unsolvedLogo) {
  unsolvedLogo.innerHTML = 'WA';
  unsolvedLogo.classList.add(css['unsolvedLogo']);
}

function setPanelAttributes(panel) {
  panel.style.display = 'none';
  panel.classList.add(css['unsolvedPanel']);
}

function setButtonAttributes(button) {
  button.classList.add(css['unsolvedButton']);
}
