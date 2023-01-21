import React from 'react';
import { CircularProgress } from '@mui/material';
import { ContentBox } from '../../../../common';
import { COLORS } from '../../../../style/theme';

interface Props {
  title?: string | React.ReactNode;
  isLoaded?: boolean;
  isFailed?: boolean;
  fallback?: keyof COLORS;
  fallbackAction?: () => void;
  customBox?: boolean;
  children?: React.ReactNode;
}

const Box = ({ title, children, isLoaded = true, isFailed, fallback, fallbackAction, customBox }: Props) => {
  if (!isLoaded)
    return (
      <ContentBox>
        <CircularProgress />
      </ContentBox>
    );
  if (isFailed) return <ContentBox defined={fallback} definedAction={fallbackAction} />;
  return customBox ? <>{children}</> : <ContentBox title={title}>{children}</ContentBox>;
};

export default Box;
