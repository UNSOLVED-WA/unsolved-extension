import React from 'react';
import styled from '@emotion/styled';
import { ScrollDirection } from '../../types';

interface Props {
  title: string;
  scrollDirection: ScrollDirection;
}

const CPHeader = ({ title, scrollDirection }: Props) => {
  return (
    <Container scrollDirection={scrollDirection}>
      <h1>{title}</h1>
    </Container>
  );
};

export default CPHeader;

const Container = styled.div<{ scrollDirection: ScrollDirection }>`
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 44px;

  display: flex;
  justify-content: start;
  align-items: center;

  left: 0px;
  padding-top: 10px;
  padding-left: 60px;
  border-radius: 15px 15px 0 0 !important;

  h1 {
    padding: 0px;
    margin: 0px;
    margin-left: 15px;
    font-size: 20px;
    transition: all 0.3s ease-in-out;
    border-radius: 15px;
    ${({ scrollDirection }) => {
      if (scrollDirection !== 'down') {
        return `
        background: #ff7373bf;
        color: #ffffff;

        padding: 5px 10px;
        backdrop-filter: blur(60px);
        font-size: 12px;
      `;
      }
    }}
  }
`;
