import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  width: calc(100% - 20px);
  height: auto;

  border-radius: 7px !important;
  background: #ffffff;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 16px 1px;

  padding: 10px;

  margin: 1px 0 10px;
`;

interface Props {
  children?: React.ReactNode;
  bgColor?: string;
  fgColor?: string;
}

const ContentBox = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default ContentBox;
