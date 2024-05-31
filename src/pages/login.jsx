import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/login';

// ------------------providing metadata----------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | LT </title>
      </Helmet>

      <LoginView />
    </>
  );
}
