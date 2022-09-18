import { useElement } from './useElement.js';

function setContentContainerAttributes(contentContainer) {
  contentContainer.innerHTML = 'contentContainer';
}

export const ContentContainer = (function () {
  const [contentContainer, setContentContainer] = useElement('div');

  setContentContainer(setContentContainerAttributes);

  return contentContainer;
})();
