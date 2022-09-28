import React, { useState } from 'react';
import styled from '@emotion/styled';
import { fadeIn } from '../style/animation.style';
import ContentPanelNavigator from './ContentPanelNavigator';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  padding-left: 60px;

  animation: ${fadeIn} 0.75s ease-in-out forwards;

  overflow: scroll;
`;

const ContentPanel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const contents = [
    { text: '내 정보', icon: 'pl' },
    { text: '랭킹보기', icon: 'rl' },
    { text: '문제추천', icon: 'sl' },
  ];

  const handleSelectedIndex = (index: number) => setSelectedIndex(index);

  return (
    <Container>
      <ContentPanelNavigator contents={contents} handleSelectedIndex={handleSelectedIndex} />
      {
        {
          0: <div>profile</div>,
          1: <div>rank</div>,
        }[selectedIndex]
      }
    </Container>
  );
};

export default ContentPanel;
