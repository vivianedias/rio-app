import { createMuiTheme } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#200122'
    },
    primary: {
      main: '#f7cc94',
      contrastText: '#222'
    },
    secondary: {
      main: '#ba3b1f',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
}, ptBR);

export default theme;