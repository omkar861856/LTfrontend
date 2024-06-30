import { Helmet } from 'react-helmet-async';

import SingleEnquiryView from 'src/sections/allEnquirys/components/enquiry-view';
// ------------------providing metadata----------------------------------------------------

export default function SingleEnquiryPage() {
  return (
    <>
      <Helmet>
        <title> Enquiry | LT </title>
      </Helmet>

      <SingleEnquiryView />
    </>
  );
}
