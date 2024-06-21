import { Helmet } from 'react-helmet-async';

import { LearnMoreView } from 'src/sections/coursePage';



// ------------------providing metadata----------------------------------------------------

export default function CourseLearnMorePage() {
  return (
    <>
      <Helmet>
        <title> Course View | LT </title>
      </Helmet>

      <LearnMoreView />     

    </>
  );
}
