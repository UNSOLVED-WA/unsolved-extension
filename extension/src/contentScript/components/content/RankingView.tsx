import React, { useEffect, useState } from 'react';
import { Ranking } from '../../../@types/Ranking';
import { ContentBox } from '../../common';

const RankingView = () => {
  const [ranking, setRanking] = useState<Ranking[]>([]);

  const redirectUserInfo = (bojId: string) => (window.location.href = `https://www.acmicpc.net/user/${bojId}`);

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
      {ranking.map((user) => (
        <ContentBox key={user.teamName + user.bojId} color='bronze'>
          <div onClick={() => redirectUserInfo(user.bojId)}>
            <div>{user.bojId}</div>
            <div>{user.score}</div>
          </div>
        </ContentBox>
      ))}
    </div>
  );
};

export default RankingView;
