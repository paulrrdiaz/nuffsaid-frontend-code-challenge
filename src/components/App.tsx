import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MessagesProvider } from '../context/messages';
import MessagesLists from './MessagesLists';

const App: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <MessagesProvider>
        <MessagesLists />
      </MessagesProvider>
    </ThemeProvider>
  );
};

export default App;
