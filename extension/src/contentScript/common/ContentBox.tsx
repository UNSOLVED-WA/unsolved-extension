import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div<{ bgColor?: string; fgColor?: string }>`
  width: calc(100% - 20px);
  height: auto;

  color: ${(props) => props.fgColor || 'black'};
  background: ${(props) => props.bgColor || 'white'};

  border-radius: 7px !important;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 16px 1px;

  padding: 10px;

  margin: 1px 0 10px;
`;

interface Props {
  children?: React.ReactNode;
  bgColor?: string;
  fgColor?: string;
}

const ContentBox = ({ children, ...props }: Props) => {
  return (
    <Container bgColor={props.bgColor} fgColor={props.fgColor}>
      {children}
    </Container>
  );
};

export default ContentBox;
