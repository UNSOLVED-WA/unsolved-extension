import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ContentPanelNavigator, ContentPanelHeader } from './content';
import { fadeIn } from '../style/animation.style';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  padding-left: 60px;

  animation: ${fadeIn} 0.75s ease-in-out forwards;

  overflow: scroll;
  .panelBody {
    padding-top: 40px;
  }
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
      <ContentPanelHeader title={contents[selectedIndex].text} />
      <ContentPanelNavigator contents={contents} handleSelectedIndex={handleSelectedIndex} />
      <div className="panelBody">
        {
          {
            0: <div>profile</div>,
            1: <div>rank</div>,
          }[selectedIndex]
        }
      </div>
    </Container>
  );
};

export default ContentPanel;
