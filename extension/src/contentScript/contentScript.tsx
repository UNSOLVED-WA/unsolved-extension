import React from 'react';
import ReactDOM from 'react-dom';
import UnsolvedFloatButton from './UnsolvedFloatButton';
import './style/main.css';

const App: React.FC<{}> = () => <UnsolvedFloatButton />;

const root = document.createElement('div');
root.id = 'unsolved-wa';

function handleHideInjectElement(element: HTMLElement, isHide: boolean) {
  element.style.display = isHide ? 'none' : 'block';
}

chrome.storage.local.get('hideButton', (data) => {
  if (data) {
    handleHideInjectElement(root, data.hideButton);

    document.body.appendChild(root);
    ReactDOM.render(<App />, root);
  }
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.hideButton) {
    handleHideInjectElement(root, changes.hideButton.newValue);
  }
});
