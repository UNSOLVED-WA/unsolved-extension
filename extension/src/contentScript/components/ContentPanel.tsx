import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ContentPanelNavigator, ContentPanelHeader } from './content';
import { fadeIn } from '../style/animation.style';
import { ContentBox } from '../common';
import Divider from '../style/Divider.styled';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  padding-left: 60px;

  animation: ${fadeIn} 0.75s ease-in-out forwards;

  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  .panel-body {
    width: 100%;
    height: 100%;
    padding-top: 40px;
    gap: 10px;

    .panel-contents {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
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
      <div className="panel-body">
        {
          {
            0: (
              <div className="panel-contents">
                <ContentBox>
                  <div>hi</div>
                </ContentBox>
                <ContentBox>
                  <div>hi2</div>
                </ContentBox>
                <ContentBox>
                  <div>hi3</div>
                </ContentBox>
                <ContentBox>
                  <div>hi4</div>
                </ContentBox>
                <ContentBox>
                  <div>hi4</div>
                </ContentBox>
                <ContentBox>
                  <div>hi4</div>
                </ContentBox>
              </div>
            ),
            1: <div>rank</div>,
          }[selectedIndex]
        }
      </div>
    </Container>
  );
};

export default ContentPanel;
