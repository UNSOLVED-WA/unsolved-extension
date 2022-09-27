import React from 'react';

const menuItem = [
  { logo: 'pl', text: '내 정보' },
  { logo: 'rl', text: '랭킹보기' },
  { logo: 'sl', text: '문제추천' },
];

const ContentPanel = () => {
  return (
    <div>
      <div>Header</div>
      <div>Content</div>
      <div>
        <div>
          <span>logo</span>
          <span>hr</span>
          {menuItem.map((item, index) => (
            <div key={item.logo + index}>
              <span>{item.logo}</span>
            </div>
          ))}
        </div>
        <div>
          <span>logo</span>
          <span>hr</span>
          {menuItem.map((item, index) => (
            <div key={item.text + index}>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentPanel;
