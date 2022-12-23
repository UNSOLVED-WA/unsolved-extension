import React, { useEffect, useState } from 'react';
import { Ranking } from '../../../@types/Ranking';
import { ContentBox, Flex } from '../../common';

import styled from '@emotion/styled';

const RankingView = () => {
  const [ranking, setRanking] = useState<Ranking[]>([]);

  const redirectUserInfo = (bojId: string) => {
    chrome.runtime.sendMessage({ message: 'toRedirectUser', type: 'sync', data: bojId });
  };

  useEffect(() => {
    // TODO: 여러 그룹일 경우 data에 넣을 teamId 설정 필요
    chrome.runtime.sendMessage({ message: 'fetchRanking', type: 'async', data: '1' }, (response) => {
      if (response.state === 'success') {
        setRanking(response.data);
      }
    });
  }, []);

  return (
    <div className='panel-contents'>
      {ranking.map((user, index) => (
        <ContentBox key={user.teamName + user.bojId} color='bronze' type='border' pointer={true}>
          <RankingBox onClick={() => redirectUserInfo(user.bojId)}>
            <Flex direction='row' justify='space-between' gap='10px'>
              <div>
                <span>{index}</span>
                <span>{user.bojId}</span>
              </div>
              <span>{user.score}</span>
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

  .user-ranking {
  }
  .user-id {
  }
`;
