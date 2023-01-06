import React from 'react';
import { IconComponentProps } from './Icon';
import { useTheme } from '@mui/material';

const ExpandMoreIcon = ({ color, width, height }: IconComponentProps) => {
  const theme = useTheme();
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={height ?? '48'}
      width={width ?? '48'}
      viewBox='0 0 50 50'
      fill={color ?? theme.icons.DEFAULT}
    >
      <path d='m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z' />
    </svg>
  );
};

export default ExpandMoreIcon;
