import React, { useEffect, useState } from 'react';
import { Ranking } from '../../../@types';
import { ContentBox, Flex } from '../../common';
import { indexToTier } from '../../utils/indexToTier';
import styled from '@emotion/styled';
import { Message } from '../../../utils/message';

const RankingView = () => {
  const [ranking, setRanking] = useState<Ranking[]>([]);

  const redirectUserInfo = (bojId: string) => {
    Message.send({ message: 'toRedirectUser', type: 'sync', data: bojId });
  };

  useEffect(() => {
    Message.send({ message: 'fetchRanking', type: 'async', data: '1' }, (response) => {
      if (response.state === 'success') {
        setRanking(response.data);
      }
    });
  }, []);

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
