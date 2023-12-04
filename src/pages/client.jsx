import { Helmet } from 'react-helmet-async';

import { ClientView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Cash By Card </title>
      </Helmet>

      <ClientView />
    </>
  );
}
