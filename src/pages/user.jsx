import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ------------------providing metadata----------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | LT </title>
      </Helmet>

      <UserView />
    </>
  );
}
