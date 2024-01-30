import React, { useState, useEffect } from 'react';
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
import { Link as Navigate, useNavigate } from 'react-router-dom';
import './SignUp.css'
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
};

const defaultTheme = createTheme();
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const SignUp = (props) => {
  const { handleSignUp, userRegistrationSuccessful } = props;

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [validEmail, setValidEmail] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    const isValidEmail = EMAIL_REGEX.test(email);
    setValidEmail(isValidEmail);
    setPasswordMatch(password === confirmPassword);
    setInputError(!email || !firstName || !lastName || !password || password.length <= 2 || firstName.length === 0 || lastName.length === 0 || email.length === 0);
  }, [email, password, confirmPassword])

  useEffect(() => {
    if (userRegistrationSuccessful)
      navigate('/login');
  }, [userRegistrationSuccessful])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !firstName
      || !lastName
      || !password
      || !email
      || password.length <= 2
      || firstName.length === 0
      || lastName.length === 0
      || !EMAIL_REGEX.test(email))
      setInputError(true);
    else {
      const username = firstName + ' ' + lastName;
      try {
        await handleSignUp(username, email, password, navigate);
      } catch (err) {
        alert('Something Went Wrong')
      }
    }
  };


  return (
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
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <div className='nameInputFieldContainer'>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  autoFocus
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={!validEmail}
                helperText={validEmail ? '' : 'Please enter a valid email'}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                error={!passwordMatch}
                helperText={passwordMatch ? '' : 'Please enter same password again'}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Tooltip title={!validEmail || !passwordMatch || inputError ? 'Check and enter all the required details correctly!!' : 'Click to register into library!!'}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!validEmail || !passwordMatch || inputError}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Tooltip>
              <Grid container>
                <Grid item>
                  <Navigate to='/login'>
                    <Link href="#" variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Navigate>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignUp;