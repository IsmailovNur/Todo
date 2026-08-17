import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { loginUser, registerUser } from './usersThunk';

export const AuthForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const serverError = useSelector((state: RootState) => state.users.error);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [validationError, setValidationError] = useState<string | null>(null);
  const [touched, setTouched] = useState({username: false, password: false});

  const validateFields = () => {
    if (!username.trim() || !password.trim()) {
      setValidationError('Incorrect username and password!');
      setTouched({username: true, password: true});
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleLogin = () => {
    if (validateFields()) dispatch(loginUser({username, password}));
  };

  const handleRegister = () => {
    if (validateFields()) dispatch(registerUser({username, password}));

  };

  const activeError = validationError || serverError;

  return (
    <Container maxWidth="xs" sx={{mt: 8}}>
      <Typography variant="h4" align="center" gutterBottom>
        Auth
      </Typography>
      {activeError &&
        <Alert severity="error" sx={{mb: 2}}>{activeError}</Alert>}

      <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (validationError) setValidationError(null);
          }}
          error={touched.username && !username.trim()}
          helperText={touched.username && !username.trim() ? 'Username is required' : ''}
          required
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (validationError) setValidationError(null);
          }}
          error={touched.password && !password.trim()}
          helperText={touched.password && !password.trim() ? 'Password is required' : ''}
          required
        />

        <Button variant="outlined" color="primary" onClick={handleLogin}>
          Sign In
        </Button>

        <Button variant="outlined" color="secondary" onClick={handleRegister}>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};