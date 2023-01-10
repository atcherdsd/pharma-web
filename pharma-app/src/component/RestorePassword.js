import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useFetchReducer from '../hooks/FetchReducer';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

export default function RestorePassword() {
  const [email, setEmail] = useState({ content: '', body: { email: '' } });
  const [open, setOpen] = useState(false);

  // Reducer for request logic

  const { isSuccsessReq, isError, reqData, isFetching } = useFetchReducer(email, 'restorePassword');

  // handler for request

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    setEmail({ content: email, body: { email: email } });
    setOpen(true);
  };

  // handler for open/close Snackbar window

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate={false} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isFetching ? true : false}
            >
              Restore password
            </Button>
          </Box>
          {isSuccsessReq && (
            <Snackbar autoHideDuration={6000} open={open} onClose={handleClose}>
              <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
                {reqData}
              </Alert>
            </Snackbar>
          )}
          {isError && (
            <Snackbar autoHideDuration={6000} open={open} onClose={handleClose}>
              <Alert severity="error" sx={{ width: '100%' }} onClose={handleClose}>
                {reqData}
              </Alert>
            </Snackbar>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
