import React from 'react';
import { ContentBox, Flex } from '../../../common';
import { indexToTier } from '../../../utils';
import { Message } from '../../../../utils';
import styled from '@emotion/styled';
import { useRanking } from '../../../hooks/useRanking';
import { CircularProgress } from '@mui/material';

interface Props {
  refresh: () => void;
}

const RankingView = ({ refresh }: Props) => {
  const { ranking, isLoaded, isFailed } = useRanking();

  const redirectUserInfo = (bojId: string) => {
    Message.send({ message: 'toRedirectUser', type: 'sync', data: bojId });
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
