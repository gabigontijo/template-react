import { Helmet } from 'react-helmet-async';

import { SimulationView } from 'src/sections/simulation/view';

// ----------------------------------------------------------------------

export default function SimulationPage() {
  return (
    <>
      <Helmet>
        <title> Simulação | Cash By Card</title>
      </Helmet>

      {/* <BlogView /> */}
      {/* <NotFoundView/> */}
      <SimulationView/>
    </>
  );
}
