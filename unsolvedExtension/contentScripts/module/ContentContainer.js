import { useElement } from './useElement.js';
import { className } from './cssTable.js';
import { ContentContainerNavigator } from './ContentContainerNavigator.js';

const menuItem = [
  { logo: 'pl', text: '내 정보' },
  { logo: 'rl', text: '랭킹보기' },
  { logo: 'sl', text: '문제추천' },
];

export const ContentContainer = function () {
  const [contentContainer, setContentContainer] = useElement('div');
  const [contentHeader, setContentHeader] = useElement('div');
  const [contentBody, setContentBody] = useElement('div');

  const [profileView, setProfileView] = useElement('div');
  const [rankView, setRankView] = useElement('div');
  const [recommandView, setRecommandView] = useElement('div');

  const ContainerNavigator = ContentContainerNavigator(menuItem, handler);

  function setDisplayNone(flexView, noneView) {
    flexView.style.display = 'flex';
    noneView.forEach((e) => (e.style.display = 'none'));
  }

  function handler(str) {
    switch (str) {
      case 'pl':
        setDisplayNone(profileView, [rankView, recommandView]);

        fetch(chrome.runtime.getURL('contentScripts/module/template/profile.html'))
          .then((response) => {
            return response.text();
          })
          .then((html) => {
            profileView.innerHTML = html;
          });

        chrome.runtime.sendMessage({ message: 'test' }, (response) => {
          profileView
            .getElementsByClassName('unwa-profile-view-container')[0]
            .insertAdjacentHTML('beforeend', response.message);
          profileView
            .getElementsByClassName('unwa-profile-view-container')[0]
            .lastElementChild.setAttribute('viewBox', '0 -30 350 170');
        });

        break;
      case 'rl':
        setDisplayNone(rankView, [profileView, recommandView]);

        break;
      case 'sl':
        setDisplayNone(recommandView, [profileView, rankView]);

        break;
      default:
        break;
    }
  }

  handler('pl');

  setContentContainer(setContentContainerAttributes);
  setContentHeader(setContentHeaderAttributes);
  setContentBody(setContentBodyAttributes);

  setProfileView(setProfileViewAttributes);
  setRankView(setRankViewAttributes);
  setRecommandView(setRecommandViewAttributes);

  function appendRankCells() {
    for (let i = 1; i <= 30; i++) {
      rankView.append(createRankCell(i, 'test', 100));
    }
  }
  appendRankCells();

  contentBody.append(profileView);
  contentBody.append(rankView);
  contentBody.append(recommandView);
  // contentBody.insertAdjacentHTML('beforeend');

  // contentContainer.append(contentHeader);
  contentContainer.append(contentBody);
  contentContainer.append(ContainerNavigator);

  return contentContainer;
};

function setContentContainerAttributes(contentContainer) {
  contentContainer.classList.add(className['contentContainer']);
}

function setContentHeaderAttributes(contentHeader) {}

function setContentBodyAttributes(contentBody) {
  contentBody.classList.add(className['contentBody']);
}

function setProfileViewAttributes(profileView) {
  profileView.classList.add(className['profileView']);
  profileView.style.display = 'flex';
}

function setRankViewAttributes(rankView) {
  // rankView.innerHTML = 'rankView';
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
