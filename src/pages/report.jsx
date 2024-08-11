import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function ReportPage() {
  return (
    <>
      <Helmet>
        <title> Relatórios | Cash By Card</title>
      </Helmet>
      <AppView/>
    </>
  );
}
