import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';

const ProviderTheme: React.FC = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ProviderTheme;
