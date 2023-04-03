import React from 'react';
import { useTheme } from '@mui/material';

type Props = {
  fill?: string;
  isTheme?: boolean;
  width: string | number;
  height: string | number;
  children: React.ReactNode;
} & React.SVGProps<SVGSVGElement>;

const SvgIcon = ({ fill = 'DEFAULT', isTheme = true, width, height, children, ...props }: Props) => {
  const theme = useTheme();
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={height ?? '200px'}
      width={width ?? '200px'}
      viewBox='0 0 50 50'
      fill={isTheme ? theme.icons[fill] : fill}
      {...props}
    >
      {children}
    </svg>
  );
};

export default SvgIcon;
