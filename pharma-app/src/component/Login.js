import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useFetchReducer from '../hooks/FetchReducer';
import { enumReqType } from '../helpers/EnumReqType';
import useAlert from '../hooks/useAlert';

const theme = createTheme();

export const Login = () => {
  const navigate = useNavigate();
  const { setAlert, setOpen } = useAlert();
  const [formData, setFormData] = useState({ content: '', body: { email: '', password: '' } });
  const { isSuccsessReq, isError, reqData, isFetching } = useFetchReducer(
    formData,
    enumReqType.login
  );

  useEffect(() => {
    if (typeof reqData !== 'string') {
      navigate('/dashboard/add-context');
      const { access, refresh } = reqData.tokens;
      localStorage.setItem('token', access.token);
      localStorage.setItem('refreshToken', refresh.token);
      localStorage.setItem('expires', refresh.expires);
    }
  }, [isSuccsessReq, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    setFormData({
      content: `${String(email)}${password}`,
      body: { email: email, password: password },
    });
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  useEffect(() => {
    if (isError) setAlert(reqData, 'error');
    else if (isSuccsessReq) setAlert('You are successfully logged in', 'success');
  }, [isError, isSuccsessReq, reqData, setAlert]);

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
            Login
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isFetching ? true : false}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={NavLink} to="restore-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
