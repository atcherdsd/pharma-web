import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Chart from '../Chart';
// import Deposits from '../Deposits';
import Orders from '../Orders';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function CreateContext() {
  return (
    <Grid container spacing={3}>
      {/* Current context */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Orders />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 1 }}>
          <Box
            component="form"
            noValidate={false}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
                md: 'row',
              },
            }}
          >
            <TextField
              margin="normal"
              required
              id="context"
              name="context"
              placeholder="Insert the new business context here"
              fullWidth
              sx={{ mr: '1rem', mt: 2, mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: { xs: 1, sm: 2 }, mb: { xs: 1, sm: 2 }, width: '2rem' }}
            >
              Add
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
