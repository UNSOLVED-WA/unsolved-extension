import React from 'react';
import SvgIconButton from './SvgIconButton';

type Props = React.SVGProps<SVGSVGElement> & {
  onClick?: () => void;
};

const StarIcon = ({ onClick, ...props }: Props) => {
  return (
    <SvgIconButton onClick={onClick} fill='navicon' {...props} width='24' height='24' viewBox='0 96 960 960'>
      <path d='m293 892.924 49.615-212.539-164.923-142.847 217.231-18.846L480 318.307l85.077 200.385 217.231 18.846-164.923 142.847L667 892.924 480 780.077 293 892.924Z' />
    </SvgIconButton>
  );
};

export default StarIcon;
