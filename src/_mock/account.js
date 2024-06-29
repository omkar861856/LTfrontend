import { useSelector } from "react-redux";

export default function Account() {
  // Selecting isProduction from the environment slice
  const isProduction = useSelector((state) => state.environment.isProduction);
  console.log(isProduction)

  // Selecting user state values from the user slice
  const { user, isLoggedIn, login_time, logout_time, login_location, token } = useSelector((state) => state.user);

  // Returning an object with selected state values
  return { user, isLoggedIn, login_time, logout_time, login_location, token };
}
