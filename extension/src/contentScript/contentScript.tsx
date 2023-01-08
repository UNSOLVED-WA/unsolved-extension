import React from 'react';
import ReactDOM from 'react-dom';
import UnsolvedFloatButton from './UnsolvedFloatButton';
import { StorageManager } from '../utils';
import './style/main.css';

const App = () => <UnsolvedFloatButton />;

const root = document.createElement('div');
root.id = 'unsolved-wa';

function handleHideInjectElement(element: HTMLElement, isHide: boolean) {
  element.style.display = isHide ? 'none' : 'block';
}

StorageManager.get('hideButton', (result) => {
  if (!result) {
    handleHideInjectElement(root, result);

    document.body.appendChild(root);
    ReactDOM.render(<App />, root);
  }
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.hideButton) {
    handleHideInjectElement(root, changes.hideButton.newValue);
  }
});
