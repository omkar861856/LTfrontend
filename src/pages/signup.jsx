import { Helmet } from 'react-helmet-async';

import SignUpView from 'src/sections/signup/signup-view';
// ------------------providing metadata----------------------------------------------------

export default function SignUpPage() {
  return (
    <>
      <Helmet>
        <title> SignUp | LT </title>
      </Helmet>

      <SignUpView />
    </>
  );
}
