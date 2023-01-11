import { extendTheme } from '@mui/joy';

declare module '@mui/joy/Switch' {
  interface SwitchPropsSizeOverrides {
    xs: true;
  }
}

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        neutral: {
          softBg: '#e1e1e1',
        },
        // danger: {
        //   plainColor: 'valid CSS color',
        //   plainHoverBg: 'valid CSS color',
        //   plainActiveBg: 'valid CSS color',
        // },
      },
    },
    dark: {
      palette: {
        neutral: {
          softBg: '#666666',
        },
      },
    },
  },
  components: {
    JoySwitch: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === 'xs' && {
            '--Switch-track-width': '30px',
            '--Switch-track-height': '15px',
            '--Switch-thumb-size': '10px',
          }),
        }),
      },
    },
  },
});
