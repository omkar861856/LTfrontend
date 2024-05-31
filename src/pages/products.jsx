import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';

// ------------------providing metadata----------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | LT </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
