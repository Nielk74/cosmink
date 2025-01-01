import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(207, 207, 207)',
      
    },
    secondary: {
      main: 'rgb(0, 0, 0)', // Example secondary color
    },
    background: {
      default: 'rgb(0,0,0)',
      paper: 'rgb(255,255,255)',
    }
  },
  typography: {
    fontFamily: 'Geist, sans-serif',
  },
});

export default theme;