import { Helmet } from 'react-helmet-async';

import { UserProfileView } from 'src/sections/userProfile';
// ------------------providing metadata----------------------------------------------------

export default function UserProfilePage() {
  return (
    <>
      <Helmet>
        <title> Profile | LT </title>
      </Helmet>

      <UserProfileView />
    </>
  );
}
