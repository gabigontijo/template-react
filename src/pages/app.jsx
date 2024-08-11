import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';
// import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Relátorios | Cash By Card </title>
      </Helmet>
      <AppView />
    </>
  );
}
