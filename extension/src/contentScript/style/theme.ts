import { createTheme } from '@mui/material';

type UWFgBg = {
  bg: string;
  fg: string;
};

export type UWColor = {
  default: UWFgBg;
  primary: UWFgBg;
  secondary: UWFgBg;
  error: UWFgBg;
  warning: UWFgBg;
  info: UWFgBg;
  success: UWFgBg;
  bronze: UWFgBg;
  silver: UWFgBg;
  gold: UWFgBg;
  platinum: UWFgBg;
  diamond: UWFgBg;
  ruby: UWFgBg;
  master: UWFgBg;
};

declare module '@mui/material/styles' {
  interface Theme {
    uwcolor: UWColor;
    unwaLight: {
      background: string;
      color: UWColor;
    };
    unwaDark: {
      background: string;
      color: UWColor;
    };
  }
  interface ThemeOptions {
    uwcolor?: UWColor;
    unwaLight?: {
      background?: string;
    };
    unwaDark?: {
      background?: string;
    };
  }
}

export const theme = createTheme({
  uwcolor: {
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
  unwaLight: {
    background: '#fff',
  },
  unwaDark: {
    background: '#000',
  },
});
