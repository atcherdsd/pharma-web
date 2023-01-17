import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import CustomerSelect from '../CustomerSelect';
import { useState } from 'react';

const NftBurning = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      <CustomerSelect setDisabled={setDisabled} />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }} disabled={disabled}>
        BURN
      </Button>
    </Paper>
  );
};

export default NftBurning;
