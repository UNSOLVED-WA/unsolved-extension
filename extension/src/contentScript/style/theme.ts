import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    tier: {
      bronze: string;
      silver: string;
      gold: string;
      platinum: string;
      diamond: string;
      ruby: string;
    };
    unwaLight: {
      background: string;
    };
    unwaDark: {
      background: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    tier?: {
      bronze?: string;
      silver?: string;
      gold?: string;
      platinum?: string;
      diamond?: string;
      ruby?: string;
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
    // '#ef8037' to #592401
    bronze: 'linear-gradient(130deg, #ef8037 0%, #592401 100%)',
    silver: '#c5bdcb', // gradient: #263548
    gold: '#ffbf35', // gradient: #d46d1c
    platinum: '#7bbb71', // gradient: #3ba3c4 #439983
    diamond: '#84a9d4', // gradient: #3c95d2 #3c4e87
    ruby: '#da4450', // gradient: #bb0047
  },
  unwaLight: {
    background: '#fff',
  },
  unwaDark: {
    background: '#000',
  },
});
