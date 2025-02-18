import { Helmet } from 'react-helmet-async';

import { RegisterView } from 'src/sections/register';

// ----------------------------------------------------------------------

export default function register() {
  return (
    <>
      <Helmet>
        <title> Register | Minimal UI </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
