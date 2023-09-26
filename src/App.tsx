import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/theme/theme';
import Todos from './views/Todos/Todos';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Todos />
    </ThemeProvider>
  );
}

export default App;
