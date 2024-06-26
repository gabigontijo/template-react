import { Helmet } from 'react-helmet-async';

import { ClientView } from 'src/sections/client/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Cliente | Cash By Card </title>
      </Helmet>

      <ClientView />
    </>
  );
}
