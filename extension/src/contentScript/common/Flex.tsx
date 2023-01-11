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
  overflow?: string;
  scrollable?: boolean;
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
      overflow={props.overflow}
    >
      {props.scrollable ? <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>{children}</div> : children}
    </Container>
  );
};

export default Flex;

const Container = styled.div<Props>`
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? 'auto'};
  display: flex;
  flex-direction: ${({ direction }) => direction ?? 'row'};

  justify-content: ${({ justify }) => justify ?? 'space-between'};
  align-items: ${({ align }) => align ?? 'center'};
  gap: ${({ gap }) => gap ?? '0px'};

  font-size: 0.9rem;

  overflow: ${({ overflow }) => overflow ?? 'hidden'};

  ${({ divided }) =>
    divided === 'two' &&
    `
    color: #555555;
    `}

  && > * {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  && > *:last-child {
    text-align: ${({ divided }) => (divided === 'two' ? 'end' : 'left')};
  }
  .material-symbols-outlined {
    font-size: 1.2rem;
    cursor: pointer;
  }

  &&::-webkit-scrollbar {
    width: 0%;
  }
`;
