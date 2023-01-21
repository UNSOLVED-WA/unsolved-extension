import React from 'react';
import { CircularProgress } from '@mui/material';
import { ContentBox } from '../../../common';
import { COLORS } from '../../../style/theme';

interface Props {
  isLoaded?: boolean;
  isFailed?: boolean;
  fallback?: keyof COLORS;
  fallbackAction?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode[] | React.ReactNode;
}

const InnerView = ({ children, isLoaded = true, isFailed, fallback = 'error', fallbackAction }: Props) => {
  if (!isLoaded)
    return (
      <ContentBox>
        <CircularProgress />
      </ContentBox>
    );
  if (isFailed) return <ContentBox defined={fallback} definedAction={fallbackAction} />;
  return <>{children}</>;
};

const View = ({ style, ...props }: Props) => {
  return (
    <div className='panel-contents' style={style}>
      <InnerView {...props} />
    </div>
  );
};

export default View;
