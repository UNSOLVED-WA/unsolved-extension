import React from 'react';
import styled from '@emotion/styled';
import { ProfileView, ScoringView, RecommandView, RankingView } from './views';
import { fadeIn } from '../../style/animation';
import { Profile } from '../../../@types';

interface Props {
  profile: Profile;
  selectedIndex: number;
}

const CPBody = ({ profile, selectedIndex }: Props) => {
  return (
    <Container>
      {
        {
          0: <ProfileView profile={profile} />,
          1: <RankingView />,
          2: <RecommandView />,
          3: <ScoringView />,
        }[selectedIndex]
      }
    </Container>
  );
};

export default React.memo(CPBody);

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 50px;
  gap: 10px;

  .panel-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    animation: ${fadeIn} 0.5s ease-in-out;
    padding-bottom: 9px;
  }
`;
