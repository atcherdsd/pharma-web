import * as React from 'react';
import { Link } from 'react-router-dom';

export default function RestorePassword() {
  return (
    <>
      Restore password form based on login form
      (https://github.com/mui/material-ui/tree/v5.11.2/docs/data/material/getting-started/templates/sign-in)
      should be there.{' '}
      <u>
        <Link to="/dashboard">Go to Dashboard</Link>
      </u>
    </>
  );
}
