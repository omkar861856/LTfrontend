/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';



import ThemeProvider2 from 'src/theme';

import Account from 'src/_mock/account';
import  {AdminRouter, NormalRouter, MentorRouter, StudentRouter } from './routes/sections';



// ----------------------------------------------------------------------

export default function App() {

  const account = Account();

  console.log(account)


  // const role = useSelector((state) => state.user.role);
  let role;

  switch ((account.user?.role === undefined)) {
    case true:
      role = 'none';      
      break;
      case false:
        role = account.user.role;      
      break;  
    default:     
      break;
  } 
   
  // useScrollToTop();

  return <ThemeProvider2>{MainRouter(role)}</ThemeProvider2>;
}

function MainRouter(role) {

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
     case 'none':
      result = <NormalRouter />;
      break;

     default:
      result = <NormalRouter />;
      break;
  }

  return result;
}
