/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { useMemo,useState, createContext } from 'react';
import ThemeProvider from 'src/theme';
import UserRouter from './routes/sections';
import NormalRouter from './routes/sections0';
// ----------------------------------------------------------------------

export const LoginContext = createContext(null);

export default function App() {

  const [login, setLogin] = useState("guest");

  const value = useMemo(() => ({ login, setLogin }), [login, setLogin]);

  useScrollToTop();

  // switch case for routing Guest, User, Admin

  return (
    <LoginContext.Provider value={value}>
      <ThemeProvider>
        {true ?  <UserRouter /> : <NormalRouter/>}       
      </ThemeProvider>
    </LoginContext.Provider>
  );
}
