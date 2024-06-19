// ----------------------------------------------------------------------

import { useSelector } from "react-redux";


export default function Account(){
  const  {user, isLoggedIn, login_time, logout_time, login_location, token} = useSelector((state) => state);
  return  {user, isLoggedIn, login_time, logout_time, login_location, token};
}

