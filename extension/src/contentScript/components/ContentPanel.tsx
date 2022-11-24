import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { ContentPanelNavigator, ContentPanelHeader, ContentPanelBody } from './content';
import { fadeIn } from '../style/animation.style';
import { ScrollDirection } from '../types/types';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 60px;

  display: flex;
  flex-direction: column;
  overflow: scroll;

  animation: ${fadeIn} 0.75s ease-in-out forwards;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentPanel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('down');
  const containerElementRef = useRef(null);

  // TODO : icon을 string에서 svg로 변경
  const contents = [
    { text: '내 정보', icon: 'face' },
    { text: '랭킹보기', icon: 'star' },
    { text: '문제추천', icon: 'recommend' },
  ];

  const handleSelectedIndex = (index: number) => setSelectedIndex(index);

  useEffect(() => {
    let lastScrollTop = 0;
    // TODO : containerElementRef.current가 null일 경우에 대한 예외처리
    const containerElement = containerElementRef.current;
    function handleScroll() {
      const scrollTop = containerElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setScrollDirection('up');
      } else {
        setScrollDirection('down');
      }
      lastScrollTop = scrollTop;
    }
    function throttle(func: () => void, timeFrame: number) {
      let lastTime = 0;
      return function () {
        const now = Date.now();
        if (now - lastTime >= timeFrame) {
          func();
          lastTime = now;
        }
      };
    }

    containerElement.addEventListener('scroll', throttle(handleScroll, 100));
    return () => {
      containerElement.removeEventListener('scroll', throttle(handleScroll, 100));
    };
  }, []);

  return (
    <Container ref={containerElementRef}>
      <ContentPanelHeader title={contents[selectedIndex].text} scrollDirection={scrollDirection} />
      <ContentPanelNavigator contents={contents} handleSelectedIndex={handleSelectedIndex} />
      <ContentPanelBody selectedIndex={selectedIndex} />
    </Container>
  );
};

export default ContentPanel;
