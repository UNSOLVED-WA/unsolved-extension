import React from 'react';
import styled from '@emotion/styled';

import RankingView from './RankingView';
import RecommandView from './RecommandView';
import ProfileView from './ProfileView';

import { fadeIn } from '../../style/animation.style';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 44px;
  // TODO : flex gap, ContentBox margin 중 하나로 통일
  gap: 10px;

  .panel-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    animation: ${fadeIn} 0.5s ease-in-out;
  }
`;

interface Props {
  selectedIndex: number;
}

const ContentPanelBody = ({ selectedIndex }: Props) => {
  return (
    <Container>
      {
        {
          0: <ProfileView />,
          1: <RankingView />,
          2: <RecommandView />,
        }[selectedIndex]
      }
    </Container>
  );
};

export default ContentPanelBody;
