import { Helmet } from 'react-helmet-async';

import { ApplyNowView } from 'src/sections/applyNowPage';

// ------------------providing metadata----------------------------------------------------

export default function ApplyNowPage() {
  return (
    <>
      <Helmet>
        <title> Apply Now | LT </title>
      </Helmet>

      <ApplyNowView />
    </>
  );
}
