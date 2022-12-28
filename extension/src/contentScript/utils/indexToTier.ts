import { UWColor } from '../style/theme';

export const indexToTier = (index: number): keyof UWColor => {
  if (index === 0) {
    return 'master';
  } else if (index <= 2) {
    return 'ruby';
  } else if (index <= 5) {
    return 'diamond';
  } else if (index <= 11) {
    return 'platinum';
  } else if (index <= 23) {
    return 'gold';
  } else if (index <= 47) {
    return 'silver';
  } else {
    return 'bronze';
  }
};
