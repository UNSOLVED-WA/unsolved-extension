import { COLORS } from '../style/theme';

export const tiers = Array.from(Array(15).keys());

export const numberToTier = (number: number): { tier: keyof COLORS; level?: number } => {
  if (number <= 5) {
    return { tier: 'bronze', level: number };
  } else if (number <= 10) {
    return { tier: 'silver', level: number - 5 };
  } else if (number <= 15) {
    return { tier: 'gold', level: number - 10 };
  } else if (number <= 20) {
    return { tier: 'platinum', level: number - 15 };
  } else if (number <= 25) {
    return { tier: 'diamond', level: number - 20 };
  } else if (number <= 30) {
    return { tier: 'ruby', level: number - 25 };
  } else {
    return { tier: 'master' };
  }
};
