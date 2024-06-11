/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { useSelector } from 'react-redux';

import ThemeProvider2 from 'src/theme';

import AdminRouter, { NormalRouter, MentorRouter, StudentRouter } from './routes/sections';

// ----------------------------------------------------------------------


export default function App() {

  

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // const role = useSelector((state) => state.user.role);

  const role = useSelector((state) => state.user.role);

  useScrollToTop();

  return (
    
      <ThemeProvider2>{isLoggedIn ? LogInRouter(role) : <NormalRouter />}</ThemeProvider2>
     
  );
}

function LogInRouter(role) {
  let result;

  switch (role) {
    case 'admin':
      result = <AdminRouter />;

      break;

    case 'mentor':
      result = <MentorRouter />;

      break;

    case 'student':
      result = <StudentRouter />;

      break;

    default: 
    result = <div>nada</div>    
      break;
  }

  return result;
}
