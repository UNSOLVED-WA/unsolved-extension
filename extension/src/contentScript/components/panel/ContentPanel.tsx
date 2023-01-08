import React, { useState, useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';
import styled from '@emotion/styled';
import { CPBody, CPHeader, CPNavigator } from '.';
import { fadeIn } from '../../style/animation';
import { SolvedUser } from '../../../@types';
import { ScrollDirection } from '../../types';

interface Props {
  profile: SolvedUser;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}
const ContentPanel = ({ profile, selectedIndex, setSelectedIndex }: Props) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('down');
  const containerElementRef = useRef(null);

  const contents = [
    { text: '내 정보', icon: 'face' },
    { text: '랭킹보기', icon: 'star' },
    { text: '문제추천', icon: 'recommend' },
    { text: '채점하기', icon: 'edit_square' },
  ];

  const handleSelectedIndex = (index: number) => setSelectedIndex(index);

  useEffect(() => {
    let lastScrollTop = 0;
    const containerElement = containerElementRef.current;
    if (containerElement === null || containerElementRef.current === null) return;
    function handleScroll() {
      const scrollTop = containerElement.scrollTop;
      if (scrollTop > lastScrollTop || scrollTop > 30) {
        setScrollDirection('up');
      } else {
        setScrollDirection('down');
      }
      lastScrollTop = scrollTop;
    }
    containerElement.addEventListener('scroll', throttle(handleScroll, 100));
    return () => {
      containerElement.removeEventListener('scroll', throttle(handleScroll, 100));
    };
  }, []);

  return (
    <Container ref={containerElementRef}>
      <CPHeader title={contents[selectedIndex].text} scrollDirection={scrollDirection} />
      <CPNavigator contents={contents} handleSelectedIndex={handleSelectedIndex} />
      <CPBody profile={profile} selectedIndex={selectedIndex} />
    </Container>
  );
};

export default ContentPanel;

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
