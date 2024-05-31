import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

// ------------------providing metadata----------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | LT </title>
      </Helmet>

      <AppView />
    </>
  );
}
