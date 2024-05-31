import { Helmet } from 'react-helmet-async';

import { NotFoundView } from 'src/sections/error';

// ------------------providing metadata----------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found </title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
