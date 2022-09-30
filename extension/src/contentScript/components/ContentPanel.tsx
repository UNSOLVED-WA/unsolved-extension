import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { ContentPanelNavigator, ContentPanelHeader, ContentPanelBody } from './content';
import { fadeIn } from '../style/animation.style';
import { throttle } from 'lodash';

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
  const containerElementRef = useRef(null);

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
      containerElementRef.current.removeEventListener('scroll', throttle(handleScroll, 100));
    };
  }, []);

  return (
    <Container ref={containerElementRef}>
      <ContentPanelHeader title={contents[selectedIndex].text} />
      <ContentPanelNavigator contents={contents} handleSelectedIndex={handleSelectedIndex} />
      <ContentPanelBody selectedIndex={selectedIndex} />
    </Container>
  );
};

export default ContentPanel;
