import { Helmet } from 'react-helmet-async';

import { InvoicesView } from 'src/sections/invoices';
// ------------------providing metadata----------------------------------------------------

export default function InvoicesPage() {
  return (
    <>
      <Helmet>
        <title> Invoices | LT </title>
      </Helmet>

      <InvoicesView />
    </>
  );
}
