import { Helmet } from 'react-helmet-async';

import { LoanView } from 'src/sections/loan/view';

// ----------------------------------------------------------------------

export default function LoanPage() {
  return (
    <>
      <Helmet>
        <title> Empréstimos | Cash By Card</title>
      </Helmet>

      <LoanView />
    </>
  );
}
