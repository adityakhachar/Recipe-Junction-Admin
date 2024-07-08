import { Helmet } from 'react-helmet-async';

import ForgotPassword from 'src/sections/forgot/forgot-view';

// ----------------------------------------------------------------------

export default function forgotpassword() {
  return (
    <>
      <Helmet>
        <title> ForgotPassword | Minimal UI </title>
      </Helmet>

      <ForgotPassword/>
      </>
  );
}
