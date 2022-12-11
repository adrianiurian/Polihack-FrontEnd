import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const ref = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    const button = ref.current;
    try {
      const getData = await axios.get(`http://127.0.0.1:5000/login?username=${username}&password=${password}`);
      if (getData.status === 200) {
        button.style.backgroundColor = '#59FF88';
        button.style.color = '#000000';
        button.innerHTML = "SUCCESS!";
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
      }, 3000);
      }
    } catch {
      button.style.backgroundColor = '#FF5959';
      button.style.color = '#000000';
      button.innerHTML = "Incorrect credentials! Please try again.";
    }
  };

  const handleUsername = event => {
    setUsername(event.target.value);
  };
  const handlePassword = event => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Stack spacing={2} sx={{mb: 5}}>
        <TextField name="email" label="Email address"  onChange={handleUsername}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handlePassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} ref={ref}>
        Login
      </LoadingButton>
    </>
  );
}
