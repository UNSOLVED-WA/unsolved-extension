import { useElement } from './useElement.js';
import { css } from './cssTable.js';
import { ContentContainerNavigator } from './ContentContainerNavigator.js';

const menuItem = [
  { logo: 'pl', text: '내 정보' },
  { logo: 'rl', text: '랭킹보기' },
  { logo: 'sl', text: '문제추천' },
];

function removeAllchild(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

export const ContentContainer = function () {
  const [contentContainer, setContentContainer] = useElement('div');
  const [contentHeader, setContentHeader] = useElement('div');
  const [contentBody, setContentBody] = useElement('div');

  const [profileView, setProfileView] = useElement('div');
  const [rankView, setRankView] = useElement('div');
  const [recommandView, setRecommandView] = useElement('div');

  const ContainerNavigator = ContentContainerNavigator(menuItem, handler);

  function handler(str) {
    switch (str) {
      case 'pl':
        const [plchild, setPlchild] = useElement('div');
        profileView.style.display = 'flex';
        rankView.style.display = 'none';
        recommandView.style.display = 'none';

        removeAllchild(profileView);
        chrome.storage.local.get('test', (result) => {
          setPlchild((e) => {
            e.innerHTML = result.test;
          });
          profileView.append(plchild);
        });

        break;
      case 'rl':
        profileView.style.display = 'none';
        rankView.style.display = 'flex';
        recommandView.style.display = 'none';
        break;
      case 'sl':
        profileView.style.display = 'none';
        rankView.style.display = 'none';
        recommandView.style.display = 'flex';
        break;
      default:
        break;
    }
  }

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

  // contentContainer.append(contentHeader);
  contentContainer.append(contentBody);

  contentContainer.append(ContainerNavigator);

  return contentContainer;
};

function setContentContainerAttributes(contentContainer) {
  contentContainer.classList.add(css['contentContainer']);
}

function setContentHeaderAttributes(contentHeader) {}

function setContentBodyAttributes(contentBody) {
  contentBody.classList.add(css['contentBody']);
}

function setProfileViewAttributes(profileView) {
  profileView.classList.add(css['profileView']);
  profileView.style.display = 'flex';
}

function setRankViewAttributes(rankView) {
  // rankView.innerHTML = 'rankView';
  rankView.classList.add(css['rankView']);
  rankView.style.display = 'none';
}

function setRecommandViewAttributes(recommandView) {
  recommandView.classList.add(css['recommandView']);
  recommandView.innerHTML = 'recommandView';
  recommandView.style.display = 'none';
}

function createRankCell(index, name, score) {
  const [rankCell, setRankCell] = useElement('div');
  const [rankCellIndex, setRankCellIndex] = useElement('div');
  const [rankCellName, setRankCellName] = useElement('div');
  const [rankCellScore, setRankCellScore] = useElement('div');

  setRankCell((e) => {
    e.classList.add(css['rankCell']);
  });
  setRankCellIndex((e) => {
    e.classList.add(css['rankCellIndex']);
    e.innerHTML = index;
  });
  setRankCellName((e) => {
    e.classList.add(css['rankCellName']);
    e.innerHTML = name;
  });
  setRankCellScore((e) => {
    e.classList.add(css['rankCellScore']);
    e.innerHTML = score;
  });

  rankCell.append(rankCellIndex);
  rankCell.append(rankCellName);
  rankCell.append(rankCellScore);

  return rankCell;
}
