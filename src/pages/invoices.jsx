import { Helmet } from 'react-helmet-async';

import { BlogView } from 'src/sections/blog/view';

// ------------------providing metadata----------------------------------------------------

export default function InvoicesPage() {
  return (
    <>
      <Helmet>
        <title> Invoices | LT </title>
      </Helmet>

      <BlogView />
    </>
  );
}
