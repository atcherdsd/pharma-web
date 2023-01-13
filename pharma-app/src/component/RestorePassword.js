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
import useFetchReducer from '../hooks/FetchReducer';
import { enumReqType } from '../helpers/EnumReqType';
import useAlert from '../hooks/useAlert';

const theme = createTheme();

export default function RestorePassword() {
  const [email, setEmail] = useState({ content: '', body: { email: '' } });
  const { setOpen } = useAlert();

  // Reducer for request logic

  const { isFetching } = useFetchReducer(email, enumReqType.restorePassword);

  // handler for request

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    setEmail({ content: email, body: { email: email } });
    setTimeout(() => {
      setOpen(true);
    }, 1000);
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
        </Box>
      </Container>
    </ThemeProvider>
  );
}
