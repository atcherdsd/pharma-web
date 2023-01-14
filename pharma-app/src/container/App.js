import React, { useEffect, useState } from 'react';
import { Box, LinearProgress } from '@mui/material';
import AppRouter from './AppRouter';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <React.Fragment>
      {isLoading && (
        <Box
          sx={{
            width: '100%',
            position: 'absolute',
            top: '0',
          }}
        >
          <LinearProgress />
        </Box>
      )}
      <AppRouter />
    </React.Fragment>
  );
}
