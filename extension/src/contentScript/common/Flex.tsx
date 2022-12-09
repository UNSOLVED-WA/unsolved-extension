import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div<{ direction?: string }>`
  width: calc(100% - 20px);
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: space-between;

  font-size: 0.9rem;

  && > * {
    color: #555555;

    flex: 1 1 50%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  && > *:last-child {
    text-align: end;
  }

  b {
  }
`;

interface Props {
  children?: React.ReactNode;
  direction?: string;
}

const Flex = ({ children, ...props }: Props) => {
  return <Container direction={props.direction}>{children}</Container>;
};

export default Flex;
