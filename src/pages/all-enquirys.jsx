import { Helmet } from 'react-helmet-async';

import { AllEnquiryView } from 'src/sections/allEnquirys';

// ------------------providing metadata----------------------------------------------------


export default function AllEnquiryPage() {
  return (
    <>
      <Helmet>
        <title> All Enquirys | LT </title>
      </Helmet>

      <AllEnquiryView />
    </>
  );
}
