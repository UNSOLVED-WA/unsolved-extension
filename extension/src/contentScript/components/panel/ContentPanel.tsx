import React from 'react';
import styled from '@emotion/styled';
import { CPBody, CPHeader, CPNavigator } from '.';
import { fadeIn } from '../../style/animation';
import { useScroll } from '../../hooks';
import { Profile } from '../../../@types';

interface Props {
  profile: Profile;
  selectedIndex: number;
  handleSelectedIndex: (index: number) => void;
}
const ContentPanel = ({ profile, selectedIndex, handleSelectedIndex }: Props) => {
  const { scrollDirection, containerElementRef } = useScroll();
  const contents = [
    { text: '내 정보', icon: 'face' },
    { text: '랭킹보기', icon: 'star' },
    { text: '문제추천', icon: 'recommend' },
    { text: '채점하기', icon: 'edit_square' },
  ];

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
