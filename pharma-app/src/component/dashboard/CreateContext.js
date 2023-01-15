import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import useAlert from '../../hooks/useAlert';
import ContextAPI from '../../services/context.api.service';
import ContextTable from '../ContextTable';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const CreateContext = () => {
  const [disabled, setDisabled] = useState(false);
  const [contexts, setContexts] = useState([]);
  const [count, setCount] = useState(0);
  const { showSuccessAlert, showErrorAlert } = useAlert();

  useEffect(() => {
    ContextAPI.getContext()
      .then((result) => {
        setContexts(result.items);
        setCount(result.count);
      })
      .catch((err) => showErrorAlert(err.response.data.message));
  }, [showErrorAlert]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setDisabled(true);

    const data = new FormData(event.currentTarget);
    const context = data.get('context');

    try {
      await ContextAPI.postContext(context);
      const result = await ContextAPI.getContext();
      setContexts(result.items);
      setCount(result.count);
      showSuccessAlert('Context successfully added');
    } catch (err) {
      showErrorAlert(err.response?.data?.message);
    }

    setDisabled(false);
  };

  return (
    <Grid container spacing={3}>
      {/* Current context */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {disabled ? (
            <CircularProgress />
          ) : (
            <ContextTable contexts={contexts} isSuccsessReq={true} count={count} isError={false} />
          )}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 1 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
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
              disabled={disabled}
              sx={{ mt: { xs: 1, sm: 2 }, mb: { xs: 1, sm: 2 }, width: { xs: '100%', sm: '2rem' } }}
            >
              Add
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateContext;
