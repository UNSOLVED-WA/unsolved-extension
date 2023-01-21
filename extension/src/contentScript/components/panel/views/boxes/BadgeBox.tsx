import React from 'react';
import SVG from 'react-inlinesvg';
import Box from './Box';
import { useBadge } from '../../../../hooks';

const BadgeBox = () => {
  const { badge, isLoaded, isFailed, refresh } = useBadge();
  return (
    <Box customBox={true} isLoaded={isLoaded} isFailed={isFailed} fallback='error' fallbackAction={refresh}>
      <SVG width={270} height={135} viewBox='0 0 350 170' src={badge} />
    </Box>
  );
};

export default BadgeBox;
