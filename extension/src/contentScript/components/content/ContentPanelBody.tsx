import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { CircularProgress } from '@mui/joy';
import { ContentBox } from '../../common';
import Profile from './ProfileView';
import useUserInfo from '../../hooks/useUserInfo';
import Group from './Group';
import Ranking from './RankingView';

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
  }
`;

interface Props {
  selectedIndex: number;
}

const ContentPanelBody = ({ selectedIndex }: Props) => {
  const [svgHTML, setSvgHTML] = useState('');
  const [myInfo, setMyInfo] = useUserInfo(null);
  const svgRef = useRef(null);

  // 프로필뷰로 분리 예정
  useEffect(() => {
    chrome.runtime.sendMessage({ message: 'fetchBadge', type: 'async' }, (response) => {
      if (response.state === 'success') {
        setSvgHTML(response.data);
        if (svgRef.current) {
          svgRef.current.lastElementChild.setAttribute('width', '270');
          svgRef.current.lastElementChild.setAttribute('height', '135');
          svgRef.current.lastElementChild.setAttribute('viewBox', '0 0 350 170');
        }
        chrome.storage.local.get('solvedUser', (result) => {
          setMyInfo(result.solvedUser.user);
        });
      }
    });
  }, [selectedIndex, setMyInfo]);

  return (
    <Container>
      {
        {
          0: (
            <div className='panel-contents'>
              {myInfo ? <Profile myBjoId={myInfo.handle} bio={myInfo.bio} /> : <CircularProgress color='danger' size='sm' />}
              {myInfo ? <Group bjoOrganization={myInfo.organizations} /> : <CircularProgress color='danger' size='sm' />}
              <ContentBox>
                <div>hi2</div>
              </ContentBox>
              <ContentBox>
                <div>hi3</div>
              </ContentBox>
              {svgHTML == '' ? (
                <CircularProgress color='danger' size='sm' />
              ) : (
                <div ref={svgRef} dangerouslySetInnerHTML={{ __html: svgHTML }} />
              )}
            </div>
          ),
          1: <Ranking />,
          2: (
            <div className='panel-contents'>
              <ContentBox>
                <div>hi</div>
              </ContentBox>
            </div>
          ),
        }[selectedIndex]
      }
    </Container>
  );
};

export default ContentPanelBody;
