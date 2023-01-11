import React from 'react';
import styled from '@emotion/styled';
import Flex from './Flex';
import { COLORS } from '../style/theme';
import { useTheme } from '@mui/material';

type DefinedContent = {
  [K in keyof COLORS]?: {
    title: string;
    icon: string;
  };
};

const definedContent: DefinedContent = {
  error: {
    title: '네트워크 상태를 확인해주세요',
    icon: 'refresh',
  },
};

interface Props {
  children?: React.ReactNode;
  title?: string | React.ReactNode;
  color?: keyof COLORS;
  defined?: keyof COLORS;
  type?: 'border' | 'background';
  pointer?: boolean;
  fullHeight?: boolean;
  definedAction?: () => void;
}

const ContentBox = ({ children, ...props }: Props) => {
  const theme = useTheme();

  if (props.defined) {
    return (
      <Container bgColor={theme.colors[props.defined]?.bg} fgColor={theme.colors[props.defined]?.fg} type={props.type}>
        <Flex direction='row' divided='none'>
          <div>{definedContent[props.defined].title}</div>
          <span onClick={props.definedAction} className='material-symbols-outlined'>
            {definedContent[props.defined].icon}
          </span>
        </Flex>
      </Container>
    );
  }
  return (
    <Container
      bgColor={theme.colors[props.color]?.bg}
      fgColor={theme.colors[props.color]?.fg}
      type={props.type}
      pointer={props.pointer}
      fullHeight={props.fullHeight}
    >
      <div style={{ height: props.fullHeight ? '100%' : 'auto' }}>
        {props.title && <h4 className='contentbox-title'>{props.title}</h4>}
        {children}
      </div>
    </Container>
  );
};

export default ContentBox;

type ContainerProps = Pick<Props, 'type' | 'pointer' | 'fullHeight'> & {
  bgColor?: string;
  fgColor?: string;
};

const Container = styled.div<ContainerProps>`
  width: calc(100% - 20px);
  height: ${({ fullHeight }) => (fullHeight ? '100%' : 'auto')};
  position: relative;

  color: ${({ type, fgColor }) => (type === 'border' ? 'black' : fgColor ?? 'black')};
  border-radius: 7px !important;
  background: ${({ bgColor }) => bgColor ?? 'white'};

  ${({ type, bgColor }) => {
    if (type === 'border') {
      return `
      background: white;
      border: 1px solid transparent;
      background-image: linear-gradient(#fff, #fff), ${bgColor ?? 'white'};
      background-origin: border-box;
      background-clip: content-box, border-box;
    `;
    }
  }}

  box-shadow: rgb(0 0 0 / 10%) 0px 2px 16px 1px;
  margin: 1px 0 10px;

  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'default')};

  > div {
    padding: 10px;
  }

  .contentbox-title {
    margin: 0;
    padding: 0;
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid rgb(0 0 0 / 10%);
  }
`;
