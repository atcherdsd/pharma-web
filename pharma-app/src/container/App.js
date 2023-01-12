import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import AppRouter from './AppRouter';
// import AlertPopup from '../component/AlertPopup';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  let content;
  if (isLoading) {
    content = (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translate(0, 600%)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    content = <AppRouter />;
  }
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return <React.Fragment>{content}</React.Fragment>;
}
