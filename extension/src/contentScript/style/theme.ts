import { createTheme } from '@mui/material';
import { SCORING_STATE } from '../../@types';

type SVG_ICON = SCORING_STATE;
type COLOR_PRESET =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'platinum'
  | 'diamond'
  | 'ruby'
  | 'master';

type FGBG = {
  bg: string;
  fg: string;
};

export type COLORS = {
  [key in COLOR_PRESET]: FGBG;
};
export type COLORS_ICON = {
  [key in SVG_ICON]: string;
};

declare module '@mui/material/styles' {
  interface Theme {
    colors: COLORS;
    icons: COLORS_ICON;
  }
  interface ThemeOptions {
    colors?: COLORS;
    icons?: COLORS_ICON;
  }
}

const _theme = {
  colors: {
    bronze: { bg: 'linear-gradient(130deg, #ef8037 0%, #592401 100%)', fg: '#fff' },
    silver: { bg: 'linear-gradient(130deg, #c5bdcb 0%, #263548 100%)', fg: '#fff' },
    gold: { bg: 'linear-gradient(130deg, #ffbf35 0%, #d46d1c 100%)', fg: '#fff' },
    platinum: { bg: 'linear-gradient(130deg, #7bbb71 0%, #439983 100%)', fg: '#fff' },
    diamond: { bg: 'linear-gradient(130deg, #84a9d4 0%, #3c95d2 50%, #3c4e87 100%)', fg: '#fff' },
    ruby: { bg: 'linear-gradient(130deg, #ff0000 0%, #bb0047 100%)', fg: '#fff' },
    master: {
      bg: 'linear-gradient(130deg, #ff0000 0%, #ff7f00 14%, #ffff00 28%, #00ff00 42%, #0000ff 56%, #4b0082 70%, #9400d3 84%, #ff0000 100%)',
      fg: '#fff',
    },
    default: { bg: '#fff', fg: '#000' },
    primary: { bg: '#3f51b5', fg: '#fff' },
    secondary: { bg: '#f50057', fg: '#fff' },
    error: { bg: '#f44336', fg: '#fff' },
    warning: { bg: '#ff9800', fg: '#fff' },
    info: { bg: '#2196f3', fg: '#fff' },
    success: { bg: '#4caf50', fg: '#fff' },
  },
  icons: {
    DEFAULT: '#000000',
    RUNNING: 'orange',
    CORRECT: 'green',
    WRONG: 'red',
    TIMEOUT: 'yellow',
    ERROR: 'red',
  },
};

export const theme = createTheme(_theme);
