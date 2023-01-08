import React from 'react';
import { CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import { ContentBox, Flex } from '../../../common';
import { useRanking } from '../../../hooks';
import { indexToTier } from '../../../util';
import { MessageManager } from '../../../../utils';

const RankingView = () => {
  const { ranking, refresh, isLoaded, isFailed } = useRanking();

  const redirectUserInfo = (bojId: string) => {
    MessageManager.send({ message: 'toRedirectUser', type: 'sync', requestData: { bojId } });
  };

  if (!isLoaded) return <CircularProgress />;
  if (isFailed)
    return (
      <div className='panel-contents'>
        <ContentBox defined='error' definedAction={refresh} />
      </div>
    );

  return (
    <div className='panel-contents'>
      {ranking.map((user, index) => (
        <ContentBox key={user.teamName + user.bojId} color={indexToTier(index)} type='border' pointer={true}>
          <RankingBox onClick={() => redirectUserInfo(user.bojId)}>
            <Flex direction='row' justify='space-between' gap='10px'>
              <div>
                <span className='ranking-index'>{index}. </span>
                <span className='ranking-id'>{user.bojId}</span>
              </div>
              <span className='ranking-score'>ⓟ {user.score}</span>
            </Flex>
          </RankingBox>
        </ContentBox>
      ))}
    </div>
  );
};

export default RankingView;

const RankingBox = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 10px;

  .ranking-id,
  .ranking-score {
    font-weight: 600;
  }
`;
