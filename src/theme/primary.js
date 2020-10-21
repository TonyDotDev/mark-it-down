import { createMuiTheme } from '@material-ui/core/styles';

const primary = createMuiTheme({
  palette: {
    secondary: {
      main: '#5a2fb9',
    },
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: '2px solid #5a2fb9',
        },
      },
    },
  },
});

export default primary;
