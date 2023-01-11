import React from 'react';
import { IconComponentProps } from './Icon';
import { useTheme } from '@mui/material';

const ExpandLessIcon = ({ color }: IconComponentProps) => {
  const theme = useTheme();
  return (
    <svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 50 50' fill={color ?? theme.icons.DEFAULT}>
      <path d='M14.15 30.75 12 28.6l12-12 12 11.95-2.15 2.15L24 20.85Z' />
    </svg>
  );
};

export default ExpandLessIcon;
