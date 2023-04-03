import React from 'react';
import SvgIconButton from './SvgIconButton';

type Props = React.SVGProps<SVGSVGElement> & {
  onClick?: () => void;
};

const RefreshIcon = ({ onClick, ...props }: Props) => {
  return (
    <SvgIconButton onClick={onClick} fill='navicon' {...props} width='24' height='24' viewBox='0 96 960 960'>
      <path d='M480 896q-133 0-226.5-93.5T160 576q0-133 93.5-226.5T480 256q85 0 149 34.5T740 385v-99q0-13 8.5-21.5T770 256q13 0 21.5 8.5T800 286v194q0 13-8.5 21.5T770 510H576q-13 0-21.5-8.5T546 480q0-13 8.5-21.5T576 450h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220 576q0 109 75.5 184.5T480 836q78 0 143-41.5T720 683q4-8 13-14t18-6q17 0 24.5 11t1.5 26q-37 89-117.5 142.5T480 896Z' />
    </SvgIconButton>
  );
};

export default RefreshIcon;
