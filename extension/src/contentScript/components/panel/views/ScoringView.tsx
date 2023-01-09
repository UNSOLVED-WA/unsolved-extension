import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useScoring } from '../../../hooks';
import { ScoringManager } from '../../../../utils';
import { ContentBox, Flex } from '../../../common';

const ScoringView = () => {
  const { scoring, retry, messageByScore } = useScoring();

  // unmout 시 scoring 초기화
  useEffect(() => () => ScoringManager.set('DEFAULT', null, -1), []);

  return (
    <Container className='panel-contents'>
      <ContentBox fullHeight>
        <Flex direction='column' align='center' justify='center' height='100%' gap='30px'>
          <div id='scoring-title'>{scoring.message}</div>
          <div id='scoring-icon'>{scoring.icon({ width: '200px', height: '200px' })}</div>
          <div id='scoring-description'>
            {
              {
                DEFAULT: <div>문제를 제출하거나 백준 채점 페이지로 이동해주세요!</div>,
                RUNNING: <div>random message</div>,
                CORRECT: <div>{messageByScore()}</div>,
                WRONG: <button onClick={retry}>재시도!</button>,
                TIMEOUT: <button onClick={retry}>재시도!</button>,
                ERROR: <button onClick={retry}>재시도!</button>,
                NETERROR: <button onClick={retry}>재시도!</button>,
              }[scoring.state ?? 'DEFAULT']
            }
          </div>
        </Flex>
      </ContentBox>
    </Container>
  );
};

export default ScoringView;

const Container = styled.div`
  width: 100%;
  height: 100%;

  #scoring-title {
    width: 100%;
    text-align: center;
    font-size: 25px;
    font-weight: 600;

    white-space: normal;
    word-break: break-all;
  }

  #scoring-icon {
    width: 200px;
    height: 200px;
  }

  #scoring-description {
    width: 100%;
    text-align: center;
    font-size: 18px;

    white-space: normal;
    word-break: break-all;

    > * {
      font-size: 17px;
    }

    button {
      background: none;
      border: none;
      color: #3f51b5;
      cursor: pointer;
    }
  }
`;
