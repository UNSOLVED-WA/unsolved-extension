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

  display: flex;
  flex-direction: column;
  gap: 5px;

  h4 {
    margin: 0;
    padding: 0;
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid rgb(0 0 0 / 10%);
  }
`;

interface Props {
  children?: React.ReactNode;
  title?: string;
  bgColor?: string;
  fgColor?: string;
  type?: 'default' | 'primary' | 'secondary';
}

const ContentBox = ({ children, ...props }: Props) => {
  return (
    <Container bgColor={props.bgColor} fgColor={props.fgColor}>
      {props.title && <h4>{props.title}</h4>}
      {children}
    </Container>
  );
};

export default ContentBox;
