/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { useMemo,useState, createContext } from 'react';
import ThemeProvider from 'src/theme';
import UserRouter from './routes/sections';
// ----------------------------------------------------------------------

export const LoginContext = createContext(null);

export default function App() {


  const [login, setLogin] = useState();

  const value = useMemo(() => ({ login, setLogin }), [login, setLogin]);

  useScrollToTop();

  return (
    <LoginContext.Provider value={value}>
      <ThemeProvider>
        <UserRouter />      
      </ThemeProvider>
    </LoginContext.Provider>
  );
}
