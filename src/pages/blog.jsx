import { Helmet } from 'react-helmet-async';

import { BlogView } from 'src/sections/blog/view';

// ------------------providing metadata----------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Blog | LT </title>
      </Helmet>

      <BlogView />
    </>
  );
}
