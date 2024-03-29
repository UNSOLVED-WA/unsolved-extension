import { useElement } from './useElement.js';
import { className } from './cssTable.js';

export const ContentContainerNavigator = function (menuItem, handler) {
  const [contentNavigator, setContentNavigator] = useElement('div');
  const [contentNavigatorLogos, setContentNavigatorLogos] = useElement('div');
  const [contentNavigatorUnsolvedLogo, setContentNavigatorUnsolvedLogo] = useElement('span');
  const [contentNavigatorHr, setContentNavigatorHr] = useElement('span');
  const [contentNavigatorSettingLogo, setContentNavigatorSettingLogo] = useElement('span');

  const [contentNavigatorTexts, setContentNavigatorTexts] = useElement('div');
  const [contentNavigatorUnsolvedText, setContentNavigatorUnsolvedText] = useElement('span');
  const [contentNavigatorHr2, setContentNavigatorHr2] = useElement('span');

  setContentNavigator(setContentNavigatorAttributes);
  setContentNavigatorLogos(setContentNavigatorLogosAttributes);
  setContentNavigatorUnsolvedLogo(setContentNavigatorLogoAttributes);
  setContentNavigatorHr(setContentNavigatorHrAttributes);
  setContentNavigatorSettingLogo(setContentNavigatorSettingLogoAttributes);

  setContentNavigatorTexts(setContentNavigatorTextsAttributes);
  setContentNavigatorUnsolvedText(setContentNavigatorUnsolvedTextAttributes);
  setContentNavigatorHr2(setContentNavigatorHrAttributes);

  contentNavigator.addEventListener('mouseover', (e) => {
    contentNavigator.style.width = '160px';
    contentNavigatorTexts.style.opacity = '1';
    contentNavigatorTexts.style.marginLeft = '60px';
  });

  contentNavigator.addEventListener('mouseout', (e) => {
    contentNavigator.style.width = '60px';
    contentNavigatorTexts.style.width = '0px';
    contentNavigatorTexts.style.opacity = '0';
  });

  contentNavigatorLogos.append(contentNavigatorUnsolvedLogo);
  contentNavigatorLogos.append(contentNavigatorHr);
  contentNavigatorLogos.append(contentNavigatorSettingLogo);

  contentNavigatorTexts.append(contentNavigatorUnsolvedText);
  contentNavigatorTexts.append(contentNavigatorHr2);

  contentNavigator.append(contentNavigatorLogos);
  contentNavigator.append(contentNavigatorTexts);

  menuItem.forEach((contentNavigatorItem) => {
    const [contentNavigatorItemLogo, setContentNavigatorItemLogo] = useElement('span');
    const [contentNavigatorItemText, setContentNavigatorItemText] = useElement('span');

    setContentNavigatorItemLogo((e) => {
      e.innerHTML = contentNavigatorItem.logo;
      e.classList.add(className['itemLogo']);
      e.addEventListener('click', () => {
        console.log('click!');
        handler(contentNavigatorItem.logo);
      });
    });
    setContentNavigatorItemText((e) => {
      e.innerHTML = contentNavigatorItem.text;
      e.classList.add(className['itemText']);
      e.addEventListener('click', () => handler(contentNavigatorItem.logo));
    });

    contentNavigatorLogos.append(contentNavigatorItemLogo);
    contentNavigatorTexts.append(contentNavigatorItemText);
  });

  return contentNavigator;
};

function setContentNavigatorAttributes(contentNavigator) {
  contentNavigator.classList.add(className['contentNavigator']);
}

function setContentNavigatorLogosAttributes(contentNavigatorLogos) {
  contentNavigatorLogos.classList.add(className['contentNavigatorLogos']);
}

function setContentNavigatorTextsAttributes(contentNavigatorTexts) {
  contentNavigatorTexts.classList.add(className['contentNavigatorTexts']);
}

function setContentNavigatorLogoAttributes(contentNavigatorUnsolvedLogo) {
  contentNavigatorUnsolvedLogo.innerHTML = 'WA';
  contentNavigatorUnsolvedLogo.classList.add(className['unwaLogoBig']);
}

function setContentNavigatorHrAttributes(contentNavigatorHr) {
  contentNavigatorHr.classList.add(className['contentNavigatorHr']);
}

function setContentNavigatorSettingLogoAttributes(contentNavigatorSettingLogo) {
  contentNavigatorSettingLogo.classList.add(className['contentNavigatorSetting']);
  contentNavigatorSettingLogo.innerHTML = '설정';
  // let imgPath = chrome.runtime.getURL('assets/setting.svg');
  // contentNavigatorSettingLogo.src = imgPath;
}

function setContentNavigatorUnsolvedTextAttributes(contentNavigatorUnsolvedText) {
  contentNavigatorUnsolvedText.innerHTML = 'unsolved';
  contentNavigatorUnsolvedText.classList.add(className['contentNavigatorUnsolvedText']);
}
