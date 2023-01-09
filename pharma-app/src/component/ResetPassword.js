import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import useFetchReducer from '../helpers/FetchReducer';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

export default function RestorePassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [checkPassword, setCheckPassword] = useState(true);
  // Reducer for request logic

  const { isSuccsessReq, isError, reqData, isFetching } = useFetchReducer(
    password,
    'resetPassword'
  );
  useEffect(() => {
    if (isSuccsessReq) navigate('/');
  }, [isSuccsessReq, navigate]);

  // handler for request

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get('password');
    const confirmPassword = data.get('confirm-password');
    if (password === confirmPassword) {
      setCheckPassword(true);
      setPassword(password);
    } else {
      setCheckPassword(false);
    }
    setOpen(true);
    console.log({
      password: password,
      confirmPassword: confirmPassword,
    });
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
            Save new password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate={false} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={checkPassword ? false : true}
              helperText={checkPassword ? '' : 'Passwords do not match'}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="confirm-password"
              error={checkPassword ? false : true}
              helperText={checkPassword ? '' : 'Passwords do not match'}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isFetching ? true : false}
            >
              Save new password
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
                Error
              </Alert>
            </Snackbar>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
