import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    error: {
      main: '#F56236'
    },
    warning: {
      main: '#FCE788'
    },
    info: {
      main: '#88FCA3'
    }
  }
});

export default theme;
