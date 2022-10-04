import { useElement } from './useElement.js';
import { className } from './cssTable.js';
import { ContentContainerNavigator } from './ContentContainerNavigator.js';

const menuItem = [
  { logo: 'pl', text: '내 정보' },
  { logo: 'rl', text: '랭킹보기' },
  { logo: 'sl', text: '문제추천' },
];

function getViews(parent, views) {
  return views.map((e) => parent.querySelector('.' + className[e]));
}

function setViewsDisplay(parent, views) {}

function handler(parent, str) {
  const [profileView, rankView, recommandView] = getViews(parent, ['profileView', 'rankView', 'recommandView']);

  switch (str) {
    case 'pl':
      setDisplayNone(parent, 'profileView', ['rankView', 'recommandView']);

      fetch(chrome.runtime.getURL('contentScripts/module/template/profile.html'))
        .then((response) => {
          return response.text();
        })
        .then((html) => {
          profileView.innerHTML = html;
        });

      chrome.runtime.sendMessage({ message: 'test' }, (response) => {
        profileView.querySelector('.unwa-profile-view-container').insertAdjacentHTML('beforeend', response.message);
        profileView
          .querySelector('.unwa-profile-view-container')
          .lastElementChild.setAttribute('viewBox', '0 -30 350 170');
      });

      break;
    case 'rl':
      setDisplayNone('rankView', ['profileView', 'recommandView']);

      break;
    case 'sl':
      setDisplayNone('recommandView', ['profileView', 'rankView']);

      break;
    default:
      break;
  }
}

export const ContentContainer = function () {
  const [contentContainer, setContentContainer] = useElement('div');
  const [contentHeader, setContentHeader] = useElement('div');
  const [contentBody, setContentBody] = useElement('div');
  const containerNavigator = ContentContainerNavigator(menuItem, handler);

  setContentContainer(setContentContainerAttributes);
  setContentHeader(setContentHeaderAttributes);
  setContentBody(setContentBodyAttributes);

  contentContainer.append(contentBody);
  contentContainer.append(containerNavigator);

  return contentContainer;
};

function setContentContainerAttributes(contentContainer) {
  contentContainer.classList.add(className['contentContainer']);
}

function setContentHeaderAttributes(contentHeader) {}

function setContentBodyAttributes(contentBody) {
  contentBody.classList.add(className['contentBody']);

  const [profileView, setProfileView] = useElement('div');
  const [rankView, setRankView] = useElement('div');
  const [recommandView, setRecommandView] = useElement('div');

  setProfileView(setProfileViewAttributes);
  setRankView(setRankViewAttributes);
  setRecommandView(setRecommandViewAttributes);

  contentBody.append(profileView);
  contentBody.append(rankView);
  contentBody.append(recommandView);

  handler(contentBody, 'pl');
}

function setProfileViewAttributes(profileView) {
  profileView.classList.add(className['profileView']);
  profileView.style.display = 'flex';
}

function setRankViewAttributes(rankView) {
  rankView.classList.add(className['rankView']);
  rankView.style.display = 'none';
}

function setRecommandViewAttributes(recommandView) {
  recommandView.classList.add(className['recommandView']);
  recommandView.innerHTML = 'recommandView';
  recommandView.style.display = 'none';
}

function createRankCell(index, name, score) {
  const [rankCell, setRankCell] = useElement('div');
  const [rankCellIndex, setRankCellIndex] = useElement('div');
  const [rankCellName, setRankCellName] = useElement('div');
  const [rankCellScore, setRankCellScore] = useElement('div');

  setRankCell((e) => {
    e.classList.add(className['rankCell']);
  });
  setRankCellIndex((e) => {
    e.classList.add(className['rankCellIndex']);
    e.innerHTML = index;
  });
  setRankCellName((e) => {
    e.classList.add(className['rankCellName']);
    e.innerHTML = name;
  });
  setRankCellScore((e) => {
    e.classList.add(className['rankCellScore']);
    e.innerHTML = score;
  });

  rankCell.append(rankCellIndex);
  rankCell.append(rankCellName);
  rankCell.append(rankCellScore);

  return rankCell;
}
