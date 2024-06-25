import { Helmet } from 'react-helmet-async';

import UserViewFinal from 'src/sections/overview/view/app-view';
// ------------------providing metadata----------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | LT </title>
      </Helmet>

      <UserViewFinal />
    </>
  );
}
