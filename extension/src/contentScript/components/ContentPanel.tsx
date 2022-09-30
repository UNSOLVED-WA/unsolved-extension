import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { ContentPanelNavigator, ContentPanelHeader, ContentPanelFooter } from './content';
import { fadeIn } from '../style/animation.style';
import { throttle } from 'lodash';
import { ContentBox } from '../common';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  padding-left: 60px;

  animation: ${fadeIn} 0.75s ease-in-out forwards;

  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  .panel-body {
    width: 100%;
    height: 100%;
    padding-top: 44px;
    gap: 10px;

    .panel-contents {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  }
`;

const ContentPanel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [svgHTML, setSvgHTML] = useState('');
  const containerElementRef = useRef(null);
  const svgRef = useRef(null);

  const contents = [
    { text: '내 정보', icon: 'pl' },
    { text: '랭킹보기', icon: 'rl' },
    { text: '문제추천', icon: 'sl' },
  ];

  const handleSelectedIndex = (index: number) => setSelectedIndex(index);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = containerElementRef.current.scrollTop;
      if (scrollTop > lastScrollTop) {
        console.log('down');
      } else {
        console.log('up');
      }
      lastScrollTop = scrollTop;
    };
    containerElementRef.current.addEventListener('scroll', throttle(handleScroll, 100));
    return () => {
      containerElementRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 프로필뷰로 분리 예정

  useEffect(() => {
    chrome.runtime.sendMessage({ message: 'fetchBadge' }, (response) => {
      setSvgHTML(response.message);
      if (svgRef.current) {
        svgRef.current.lastElementChild.setAttribute('width', '270');
        svgRef.current.lastElementChild.setAttribute('height', '135');
        svgRef.current.lastElementChild.setAttribute('viewBox', '0 0 350 170');
      }
    });
  }, []);

  return (
    <Container ref={containerElementRef}>
      <ContentPanelHeader title={contents[selectedIndex].text} />
      <ContentPanelNavigator contents={contents} handleSelectedIndex={handleSelectedIndex} />
      <div className="panel-body">
        {
          {
            0: (
              <div className="panel-contents">
                <ContentBox>
                  <div>hi</div>
                </ContentBox>
                <ContentBox>
                  <div>hi2</div>
                </ContentBox>
                <ContentBox>
                  <div>hi3</div>
                </ContentBox>
                <ContentBox>
                  <div>hi3</div>
                </ContentBox>
                <div ref={svgRef} dangerouslySetInnerHTML={{ __html: svgHTML }} />
              </div>
            ),
            1: (
              <div className="panel-contents">
                <ContentBox>
                  <div>hi</div>
                </ContentBox>
              </div>
            ),
            2: (
              <div className="panel-contents">
                <ContentBox>
                  <div>hi</div>
                </ContentBox>
              </div>
            ),
          }[selectedIndex]
        }
      </div>
    </Container>
  );
};

export default ContentPanel;
