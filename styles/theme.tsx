import { createTheme, ThemeOptions } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { deepmerge } from '@mui/utils';

const defaultTheme = createTheme();

const customThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: green[500], // Example primary color
    },
    secondary: {
      main: 'rgb(0, 0, 0)', // Example secondary color
    },
    background: {
      default: 'rgb(0,0,0)',
      paper: 'rgb(255,255,255)',
    },
  },
  typography: {
    fontFamily: 'Geist, sans-serif',
  },
};

const theme = createTheme(deepmerge(defaultTheme, customThemeOptions));

export default theme;