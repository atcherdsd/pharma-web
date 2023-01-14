import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Chart from '../Chart';
// import Deposits from '../Deposits';
import ContextTable from '../ContextTable';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import useFetchReducer from '../../hooks/FetchReducer';
import tranformToUpperCase from '../../helpers/transformToUpperCase';
import { enumReqType } from '../../helpers/EnumReqType';
import useAlert from '../../hooks/useAlert';

export default function CreateContext() {
  const [type, setType] = useState(enumReqType.getContext);
  const [context, setContext] = useState({ content: 'start', body: { name: '' } });
  const { isSuccsessReq, isError, reqData, isFetching } = useFetchReducer(context, type);
  const { setOpen } = useAlert();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const context = data.get('context');
    setType(enumReqType.postContext);
    setContext({ content: context, body: { name: tranformToUpperCase(context) } });
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };
  return (
    <Grid container spacing={3}>
      {/* Current context */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {isFetching ? (
            <CircularProgress />
          ) : (
            <ContextTable
              contexts={reqData.items}
              isSuccsessReq={isSuccsessReq}
              count={reqData.count}
              isError={isError}
            />
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
              disabled={isFetching ? true : false}
              sx={{ mt: { xs: 1, sm: 2 }, mb: { xs: 1, sm: 2 }, width: { xs: '100%', sm: '2rem' } }}
            >
              Add
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
