import { Helmet } from 'react-helmet-async';

import { PartnerView } from 'src/sections/partner/view';

// ----------------------------------------------------------------------

export default function PartnerPage() {
  return (
    <>
      <Helmet>
        <title> Parceiros | Cash By Card </title>
      </Helmet>

      <PartnerView />
    </>
  );
}
