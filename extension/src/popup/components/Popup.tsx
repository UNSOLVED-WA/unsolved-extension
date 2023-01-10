import React from 'react';
import styled from '@emotion/styled';
import { Typography, Switch } from '@mui/joy';
import { useColorScheme } from '@mui/joy/styles';
import { useHideButton, useAutoScoring, useCommandsToggleVisible } from '../hooks';

interface Props {
  title: string | JSX.Element;
  value: boolean;
  action: () => void;
  isLoading?: boolean;
}

const Option = ({ title, value, action, isLoading }: Props) => {
  return (
    <div className='option'>
      <Typography fontSize='xs' fontWeight='lg'>
        {title}
      </Typography>
      <Switch color={value ? 'primary' : 'neutral'} checked={value} disabled={isLoading} size='xs' onChange={action} />
    </div>
  );
};

const Popup = () => {
  const { isHide, isLoading: isHideLoading, toggleIsHide } = useHideButton();
  const { isAutoScoring, isLoading: isAutoScoringLoading, toggleIsAutoScoring } = useAutoScoring();
  const { isUseCommandsToggleVisible, isLoading: isUseCommandsToggleVisibleLoading, toggleIsUseCommands } = useCommandsToggleVisible();
  const { mode, systemMode } = useColorScheme();
  console.log(mode);

  return (
    <Container mode={systemMode}>
      <header>
        <Typography fontSize='sm' fontWeight='lg'>
          Unsolved.
          <Typography variant='solid' color='danger'>
            wa
          </Typography>{' '}
          환경설정
        </Typography>
      </header>
      <div id='options'>
        <Option title='버튼 숨기기' value={isHide} action={() => toggleIsHide(true)} isLoading={isHideLoading} />
        <Option
          title='백준 채점시 자동으로 점수 전송'
          value={isAutoScoring}
          action={() => toggleIsAutoScoring(true)}
          isLoading={isAutoScoringLoading}
        />
        <Option
          title={
            <>
              <Typography variant='soft'>cmd shift L</Typography> 로 버튼 보기/숨기기
            </>
          }
          value={isUseCommandsToggleVisible}
          action={() => toggleIsUseCommands(true)}
          isLoading={isUseCommandsToggleVisibleLoading}
        />
      </div>
    </Container>
  );
};

export default Popup;

const Container = styled.div<{ mode: 'light' | 'dark' | 'system' }>`
  width: 230px;
  height: auto;

  padding: 10px;

  background: ${({ mode }) => (mode === 'light' ? '#ffffff' : '#1f1f1f')};

  header {
    border-bottom: ${({ mode }) => (mode === 'light' ? '#e0e0e0' : '#3f3f3f')} solid 1px;
    margin: 0 0 10px 0;
    padding: 0 0 10px 0;
  }

  #options {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .option {
      display: flex;
      justify-content: space-between;
    }
  }
`;
