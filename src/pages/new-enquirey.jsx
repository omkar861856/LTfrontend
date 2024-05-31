import { Helmet } from 'react-helmet-async';

import { NewEnquireyView } from 'src/sections/newenquirey';
// ------------------providing metadata----------------------------------------------------

export default function NewEnquireyPage() {
  return (
    <>
      <Helmet>
        <title> New Enquirey | LT </title>
      </Helmet>

      <NewEnquireyView />
    </>
  );
}
