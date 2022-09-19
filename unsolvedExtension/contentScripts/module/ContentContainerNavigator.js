import { useElement } from './useElement.js';
import { css } from './cssTable.js';

const contentLogoAndTexts = [
  { unsolved: { logo: '', text: 'unsolved' } },
  { profile: { logo: '', text: '내 정보' } },
  { rank: { logo: '', text: '랭킹보기' } },
  { recommand: { logo: '', text: '문제추천' } },
];

export const ContentContainerNavigator = (function () {
  const [contentNavigator, setContentNavigator] = useElement('div');
  const [contentNavigatorLogos, setContentNavigatorLogos] = useElement('div');
  const [contentNavigatorTexts, setContentNavigatorTexts] = useElement('div');
  const [contentNavigatorUnsolvedLogo, setContentNavigatorUnsolvedLogo] = useElement('span');
  const [contentNavigatorHr, setContentNavigatorHr] = useElement('span');
  const [contentNavigatorSettingLogo, setContentNavigatorSettingLogo] = useElement('button');

  setContentNavigator(setContentNavigatorAttributes);
  setContentNavigatorLogos(setContentNavigatorLogosAttributes);
  setContentNavigatorUnsolvedLogo(setContentNavigatorLogoAttributes);
  setContentNavigatorHr(setContentNavigatorHrAttributes);
  setContentNavigatorSettingLogo(setContentNavigatorSettingLogoAttributes);

  setContentNavigatorTexts(setContentNavigatorTextsAttributes);

  contentNavigator.addEventListener('mouseover', (e) => {
    contentNavigator.style.width = '160px';
    contentNavigatorTexts.style.opacity = '1';
    contentNavigatorTexts.style.marginLeft = '60px';
  });

  contentNavigator.addEventListener('mouseout', (e) => {
    contentNavigator.style.width = '60px';
    contentNavigatorTexts.style.opacity = '0';
  });

  contentNavigatorLogos.append(contentNavigatorUnsolvedLogo);
  contentNavigatorLogos.append(contentNavigatorHr);
  contentNavigatorLogos.append(contentNavigatorSettingLogo);

  contentNavigator.append(contentNavigatorLogos);
  contentNavigator.append(contentNavigatorTexts);

  return contentNavigator;
})();

function setContentNavigatorAttributes(contentNavigator) {
  contentNavigator.classList.add(css['contentNavigator']);
}

function setContentNavigatorLogosAttributes(contentNavigatorLogos) {
  contentNavigatorLogos.classList.add(css['contentNavigatorLogos']);
}

function setContentNavigatorTextsAttributes(contentNavigatorTexts) {
  contentNavigatorTexts.classList.add(css['contentNavigatorTexts']);
  contentNavigatorTexts.innerHTML = 'texts';
}

function setContentNavigatorLogoAttributes(contentNavigatorUnsolvedLogo) {
  contentNavigatorUnsolvedLogo.innerHTML = 'WA';
  contentNavigatorUnsolvedLogo.classList.add(css['unsolvedLogoBig']);
}

function setContentNavigatorHrAttributes(contentNavigatorHr) {
  contentNavigatorHr.classList.add(css['contentNavigatorHr']);
}

function setContentNavigatorSettingLogoAttributes(contentNavigatorSettingLogo) {
  contentNavigatorSettingLogo.classList.add(css['contentNavigatorSetting']);
  contentNavigatorSettingLogo.innerHTML = 'sett';
}
