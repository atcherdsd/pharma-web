import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAlert from '../hooks/useAlert';
import AuthAPIService from '../services/new.auth.api.service';

const theme = createTheme();

export default function RestorePassword() {
  const [disabled, setDisabled] = useState(false);
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    try {
      await AuthAPIService.reqToForgotPassword(email);
      showSuccessAlert('Restore email successfully sent! Please, check your email.');
    } catch (err) {
      showErrorAlert(err.response.data.message);
    }

    setDisabled(false);
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
              disabled={disabled}
            >
              Restore password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
