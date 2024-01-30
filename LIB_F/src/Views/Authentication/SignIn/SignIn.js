import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as NavigateTo, useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MyLIB
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


const defaultTheme = createTheme();
const SignIn = (props) => {
  const navigate = useNavigate();

  const { handleSignIn, validateToken } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState(true);
  useEffect(() => {
    const checkIsUserLoggedIn = async () => {
      try {
        await validateToken('/', navigate);
      }
      catch (er) {
        alert('Something went wrong!!')
      }
    }
    checkIsUserLoggedIn();
  }, []);

  useEffect(() => {
    setInputError(!password || password.lengtth === 0 || !email || email.lrngth === 0 || !EMAIL_REGEX.test(email));
  }, [email, password]);

  const handleSubmit = async () => {

    try {
      console.log(email,password)
      await handleSignIn(email, password, navigate);
    } catch (error) {
      alert('Something went wrong!!');
    }
  };

  return (
    <>{
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  autoComplete="current-password"
                />
                <Tooltip title={inputError ? 'Please verify and fill all required fields!!' : 'Click to sign in into library!!'}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={() => handleSubmit()}
                    disabled={inputError}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </Tooltip>
                <Grid container>
                  <Grid item>
                    <NavigateTo to='/signup'>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </NavigateTo>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>}</>
  );
}

export default SignIn;