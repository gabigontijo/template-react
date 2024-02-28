import { Helmet } from 'react-helmet-async';

import { MachineView } from 'src/sections/machine/view';

// import { BlogView } from 'src/sections/blog/view';
// import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Relátórios | Cash By Card</title>
      </Helmet>

      {/* <BlogView /> */}
      {/* <NotFoundView/> */}
      <MachineView/>
    </>
  );
}
