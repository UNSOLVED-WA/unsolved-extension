import React from 'react';
import styled from '@emotion/styled';
import Flex from './Flex';
import { UWColor } from '../style/theme';
import { useTheme } from '@mui/material';

type DefinedContent = {
  [K in keyof UWColor]?: {
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
  title?: string;
  color?: keyof UWColor;
  defined?: keyof UWColor;
  definedAction?: () => void;
}

const ContentBox = ({ children, ...props }: Props) => {
  const theme = useTheme();

  if (props.defined) {
    return (
      <Container bgColor={theme.uwcolor[props.defined]?.bg} fgColor={theme.uwcolor[props.defined]?.fg}>
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
    <Container bgColor={theme.uwcolor[props.color]?.bg} fgColor={theme.uwcolor[props.color]?.fg}>
      {props.title && <h4 className='contentbox-title'>{props.title}</h4>}
      {children}
    </Container>
  );
};

export default ContentBox;

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

  .contentbox-title {
    margin: 0;
    padding: 0;
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid rgb(0 0 0 / 10%);
  }
`;
