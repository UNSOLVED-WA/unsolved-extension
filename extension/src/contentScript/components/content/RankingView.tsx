import React, { useEffect, useState } from 'react';
import { Ranking } from '../../../@types/Ranking';
import { ContentBox, Flex } from '../../common';

const RankingView = () => {
  const [ranking, setRanking] = useState<Ranking[]>([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ message: 'fetchRanking', type: 'async', data: '1' }, (response) => {
      if (response.state === 'success') {
        setRanking(response.data);
      } else console.log('error');
    });
  }, []);

  return (
    <div className='panel-contents'>
      {ranking.length === 0 ? (
        <ContentBox color='error'>
          <div
            onClick={() => {
              chrome.runtime.sendMessage({ message: 'toRegisterInSchool', type: 'sync' });
            }}
            style={{ cursor: 'pointer' }}
          >
            <Flex direction='row' divided='none'>
              학교/회사 정보를 추가해주세요
            </Flex>
          </div>
        </ContentBox>
      ) : (
        ranking.map((user) => (
          <ContentBox key={user.teamName + user.bojId} color='bronze'>
            <div>{user.bojId}</div>
            <div>{user.score}</div>
          </ContentBox>
        ))
      )}
    </div>
  );
};

export default RankingView;
