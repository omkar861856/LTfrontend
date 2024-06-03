/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { createContext } from 'react';
import ThemeProvider from 'src/theme';
import UserRouter, { NormalRouter } from './routes/sections';
// ----------------------------------------------------------------------

export const LoginContext = createContext(null);

export default function App() {
  
  const login = window.localStorage.getItem('login');
  

  useScrollToTop();

  return (
    <LoginContext.Provider>
      <ThemeProvider>{login === 'true' ? <UserRouter /> : <NormalRouter />}</ThemeProvider>
    </LoginContext.Provider>
  );
}
