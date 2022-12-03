declare module '@mui/material/styles' {
  interface Theme {
    unwaTier: {
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
    unwaTier?: {
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
