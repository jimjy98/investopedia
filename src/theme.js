import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
      primary: {
        main: '#369A57'
      },
      background: {
        main: '#37393f',
        contrastText: '#fff',
    },
    white: {
        main: '#fff',
      }
    },
    typography: {
      fontFamily: ['Roboto', 'sans-serif'],
      fontWeight: 'normal',
      color: 'white',
      h1: {
        fontSize: 72,
        margin: '14px 0',
      },
      h2: {
        fontSize: 48,
      },
      text: {
        fontSize: 16,
      }
    }
});
