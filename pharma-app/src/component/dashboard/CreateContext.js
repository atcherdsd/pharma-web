import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import useAlert from '../../hooks/useAlert';
import ContextAPI from '../../services/context.api.service';
import ContextTable from '../ContextTable';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import transformToUpperCase from '../../helpers/transformToUpperCase';
import LoadingButton from '@mui/lab/LoadingButton';

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
    const context = transformToUpperCase(data.get('context'));

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
      <Grid item xs={12}>
        <Paper sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={0} md={2}></Grid>
            <Grid item xs={12} md={8}>
              <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ContextTable contexts={contexts} isSuccsess={true} count={count} isError={false} />
              </Grid>
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
                  size="small"
                  disabled={disabled}
                  sx={{ mr: '1rem', mt: 2, mb: 2 }}
                />
                <LoadingButton
                  sx={{ mt: { xs: 1, sm: 2 }, mb: { xs: 1, sm: 2 } }}
                  type="submit"
                  loading={disabled}
                  variant="contained"
                  disabled={disabled}
                >
                  <span>Add</span>
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateContext;
