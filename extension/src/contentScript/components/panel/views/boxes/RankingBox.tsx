import React from 'react';
import styled from '@emotion/styled';
import { useRanking } from '../../../../hooks';
import { ContentBox, Flex } from '../../../../common';
import { indexToTier, redirectUserInfo } from '../../../../util';
import Box from './Box';
import { Team } from '../../../../../@types';

interface Props {
  team: Team;
}

const RankingBox = ({ team }: Props) => {
  const { ranking, refresh, isLoaded, isFailed } = useRanking(team);

  return (
    <Box customBox={true} isLoaded={isLoaded} isFailed={isFailed} fallback='error' fallbackAction={refresh}>
      {ranking.map((user, index) => (
        <ContentBox key={user.teamName + user.bojId} color={indexToTier(index)} type='border' pointer={true}>
          <Ranking onClick={() => redirectUserInfo(user.bojId)}>
            <Flex direction='row' justify='space-between' gap='10px'>
              <div>
                <span className='ranking-index'>{index}. </span>
                <span className='ranking-id'>{user.bojId}</span>
              </div>
              <span className='ranking-score'>ⓟ {user.score}</span>
            </Flex>
          </Ranking>
        </ContentBox>
      ))}
    </Box>
  );
};

export default RankingBox;

const Ranking = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 10px;

  .ranking-id,
  .ranking-score {
    font-weight: 600;
  }
`;
