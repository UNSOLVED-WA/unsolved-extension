import React from 'react';
import styled from '@emotion/styled';

type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type Divided = 'none' | 'two' | 'three';
type Align = 'start' | 'center' | 'end';
type Justify = 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'center' | 'end';

interface Props {
  className?: string;
  children?: React.ReactNode;
  direction?: Direction;
  divided?: Divided;
  width?: string;
  height?: string;
  align?: Align;
  justify?: Justify;
  gap?: string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
}

const Flex = ({ children, ...props }: Props) => {
  return (
    <Container
      className={props.className}
      direction={props.direction}
      divided={props.divided}
      width={props.width}
      height={props.height}
      align={props.align}
      justify={props.justify}
      gap={props.gap}
      flexGrow={props.flexGrow}
      flexShrink={props.flexShrink}
      flexBasis={props.flexBasis}
    >
      {children}
    </Container>
  );
};

export default Flex;

const Container = styled.div<Props>`
  width: ${(props) => props.width ?? '100%'};
  height: ${(props) => props.height ?? 'auto'};
  display: flex;
  flex-direction: ${(props) => props.direction ?? 'row'};

  justify-content: ${(props) => props.justify ?? 'space-between'};
  align-items: ${(props) => props.align ?? 'center'};
  gap: ${(props) => props.gap ?? '0px'};

  flex-grow: ${(props) => props.flexGrow ?? 1};
  flex-shrink: ${(props) => props.flexShrink ?? 1};
  flex-basis: ${(props) => props.flexBasis ?? 'auto'};

  font-size: 0.9rem;

  ${(props) =>
    props.divided === 'two' &&
    `
    color: #555555;
    `}

  && > * {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  && > *:last-child {
    text-align: ${(props) => (props.divided === 'two' ? 'end' : 'left')};
  }
  .material-symbols-outlined {
    font-size: 1.2rem;
    cursor: pointer;
  }
`;
