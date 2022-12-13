import React from 'react';
import styled from '@emotion/styled';

type Direction = 'row' | 'column';
type Divided = 'none' | 'two' | 'three';

const Container = styled.div<{ direction?: Direction; divided?: Divided }>`
  /* width: calc(100% - 20px); */
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: space-between;

  font-size: 0.9rem;

  gap: 30px;
  /* color: #555555; */
  && > * {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  && > *:last-child {
    text-align: end;
  }
  .material-symbols-outlined {
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

interface Props {
  children?: React.ReactNode;
  direction?: Direction;
  divided?: Divided;
}

const Flex = ({ children, ...props }: Props) => {
  return (
    <Container direction={props.direction} divided={props.divided}>
      {children}
    </Container>
  );
};

export default Flex;
