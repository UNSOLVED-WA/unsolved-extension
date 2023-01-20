import React from 'react';
import { CircularProgress } from '@mui/material';
import { ContentBox } from '../../../common';

interface Props {
  isLoading?: boolean;
  isFailed?: boolean;
  failedAction?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode[] | React.ReactNode;
}

const InnerView = ({ children, isLoading, isFailed, failedAction }: Props) => {
  if (isLoading)
    return (
      <ContentBox>
        <CircularProgress />
      </ContentBox>
    );
  if (isFailed) return <ContentBox defined='error' definedAction={failedAction} />;
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
