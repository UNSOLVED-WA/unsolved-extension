import { createTheme } from '@mui/material';

type FGBG = {
  bg: string;
  fg: string;
};

declare module '@mui/material/styles' {
  interface Theme {
    tier: {
      bronze: FGBG;
      silver: FGBG;
      gold: FGBG;
      platinum: FGBG;
      diamond: FGBG;
      ruby: FGBG;
    };
    unwaLight: {
      background: string;
    };
    unwaDark: {
      background: string;
    };
  }
  interface ThemeOptions {
    tier?: {
      bronze?: FGBG;
      silver?: FGBG;
      gold?: FGBG;
      platinum?: FGBG;
      diamond?: FGBG;
      ruby?: FGBG;
    };
    unwaLight?: {
      background?: string;
    };
    unwaDark?: {
      background?: string;
    };
  }
}

export const theme = createTheme({
  tier: {
    bronze: { bg: 'linear-gradient(130deg, #ef8037 0%, #592401 100%)', fg: '#fff' },
    silver: { bg: 'linear-gradient(130deg, #c5bdcb 0%, #263548 100%)', fg: '#fff' },
    gold: { bg: 'linear-gradient(130deg, #ffbf35 0%, #d46d1c 100%)', fg: '#fff' },
    platinum: { bg: 'linear-gradient(130deg, #7bbb71 0%, #439983 100%)', fg: '#fff' },
    diamond: { bg: 'linear-gradient(130deg, #84a9d4 0%, #3c95d2 50%, #3c4e87 100%)', fg: '#fff' },
    ruby: { bg: 'linear-gradient(130deg, #da4450 0%, #bb0047 100%)', fg: '#fff' },
  },
  unwaLight: {
    background: '#fff',
  },
  unwaDark: {
    background: '#000',
  },
});
