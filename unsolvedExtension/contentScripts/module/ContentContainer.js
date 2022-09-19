import { useElement } from './useElement.js';
import { css } from './cssTable.js';
import { ContentContainerNavigator } from './ContentContainerNavigator.js';

export const ContentContainer = (function () {
  const [contentContainer, setContentContainer] = useElement('div');
  const [contentHeader, setContentHeader] = useElement('div');
  const [contentBody, setContentBody] = useElement('div');

  setContentContainer(setContentContainerAttributes);
  setContentHeader(setContentHeaderAttributes);
  setContentBody(setContentBodyAttributes);

  contentContainer.append(contentHeader);
  contentContainer.append(contentBody);
  contentContainer.append(ContentContainerNavigator);

  return contentContainer;
})();

function setContentContainerAttributes(contentContainer) {
  contentContainer.classList.add(css['contentContainer']);
}

function setContentHeaderAttributes(contentHeader) {
  contentHeader.innerHTML = 'contentHeader';
}

function setContentBodyAttributes(contentBody) {
  contentBody.innerHTML = 'contentBody';
}
