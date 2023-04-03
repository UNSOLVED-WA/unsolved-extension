import React from 'react';
import SvgIconButton from './SvgIconButton';

type Props = React.SVGProps<SVGSVGElement> & {
  onClick?: () => void;
};

const GroupAddIcon = ({ onClick, ...props }: Props) => {
  return (
    <SvgIconButton onClick={onClick} fill='navicon' {...props} width='24' height='24' viewBox='0 96 960 960'>
      <path d='M474 570q26-32 38.5-66t12.5-79q0-45-12.5-79T474 280q76-17 133.5 23T665 425q0 82-57.5 122T474 570Zm194 326q10-2 16-10.5t6-21.5v-62q0-51-26-95t-90-74q173 22 236.5 64T874 802v63.505q0 13.495-8.625 21.995Q856.75 896 844 896H668Zm161.825-289Q817 607 808.5 598.375T800 577v-70h-70q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T730 447h70v-70q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T860 377v70h70q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T930 507h-70v70q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625ZM315 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM30 896q-12.75 0-21.375-8.625T0 866v-64q0-35 18.5-63.5T68 696q72-32 128.5-46T315 636q62 0 118 14t128 46q31 14 50 42.5t19 63.5v64q0 12.75-8.625 21.375T600 896H30Z' />
    </SvgIconButton>
  );
};

export default GroupAddIcon;
