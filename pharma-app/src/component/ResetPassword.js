import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function ResetPassword() {
  const resetPasswordToken = location.search ? location.search.split('=')[1] : null;
  const { showErrorAlert } = useAlert();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [checkPassword, setCheckPassword] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get('password');
    const confirmPassword = data.get('confirm-password');
    if (password === confirmPassword) {
      setCheckPassword(true);
      try {
        await AuthAPIService.reqToResetPassword(resetPasswordToken, password);
        navigate('/');
      } catch (err) {
        showErrorAlert(err.response.data.message);
      }
    } else {
      setCheckPassword(false);
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
              disabled={disabled}
            >
              Save new password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
