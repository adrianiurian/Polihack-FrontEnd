import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const nationalities = [
    {
      value: 'Romanian',
      label: 'Romanian',
    },
    {
      value: 'Ukrainian',
      label: 'Ukrainian',
    },
    {
      value: 'Russian',
      label: 'Russian',
    },
    {
      value: 'Other',
      label: 'Other',
     },
  ];

export default function SignupForm({userType}) {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nationality, setNationality] = useState('Romanian');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const geolocationAPI = navigator.geolocation;

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const ref = useRef(null);

  const getUserCoordinates = async () => {
    if (!geolocationAPI) {
      console.log('Geolocation API is not available in your browser!')
    } else {
      geolocationAPI.getCurrentPosition((position) => {
        const { coords } = position;
        setLat(coords.latitude);
        setLng(coords.longitude);
      }, (error) => {
        console.log(error);
      })
    }
  }
  useEffect(() => {
    const getCoord = async () => {
        const response = await getUserCoordinates();
    }
    getCoord();
  }, [lat, lng]);

  const handleClick = async () => {
    if (userType === 'provider') {
        const data = {
            'password': password, 
            'name': name, 
            'phone_number': phone, 
            'email': email
        };
        const sendData = await axios.post(`http://127.0.0.1:5000/users/provider/${username}`, data);
    }
    if (userType === 'refugee') {
        const data = {
            'password': password, 
            'name': name, 
            'phone_number': phone, 
            'email': email, 
            'nationality': nationality, 
            'location': {
                'lat': lat, 
                'lng': lng
            }, 
            'skills': [], 
            'address': location
        };
        const sendData = await axios.post(`http://127.0.0.1:5000/users/refugee/${username}`, data);
    }
    const button = ref.current;
    button.style.backgroundColor = '#59FF88';
    button.style.color = '#000000';
    button.innerHTML = "SUCCESS!";
    setTimeout(() => {
        navigate('/dashboard', { replace: true });
    }, 3000);
  };

  useEffect(() => {
    console.log(userType);
  }, [userType]);

  const handleUsername = event => {
    setUsername(event.target.value);
  };
  const handlePassword = event => {
    setPassword(event.target.value);
  };
  const handleName = event => {
    setName(event.target.value);
  };
  const handlePhone = event => {
    setPhone(event.target.value);
  };
  const handleEmail = event => {
    setEmail(event.target.value);
  };
  const handleLocation = event => {
    setLocation(event.target.value);
  };

  const handleNationality = (event) => {
    setNationality(event.target.value);
  };

  return (
    <>
      <Stack spacing={0} sx={{mb: 5}}>
        <Typography variant="h6" sx={{ mb: 1 }}>
            Account information          
        </Typography>
        <TextField name="username" label="Username"  sx={{mb: 2}} onChange={handleUsername}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handlePassword}
          sx={{mb: 2}}
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
        <Typography variant="h6" sx={{ mt: 0, mb: 1.5 }}>
            Contact information          
        </Typography>
        <TextField name="name" label="Full Name" sx={{mb: 2}} onChange={handleName}/>
        <TextField name="phone" label="Phone Number"  sx={{mb: 2}} onChange={handlePhone}/>
        <TextField name="email" label="Email Address"  sx={{mb: 2}} onChange={handleEmail}/>

        {userType === 'refugee' ? 
            <>
                <Typography variant="h6" sx={{ mt: 0, mb: 1.5 }}>
                    More information       
                </Typography>  
                <div>
                    <TextField
                    id="outlined-select"
                    select
                    label="Nationality"
                    value={nationality}
                    onChange={handleNationality}
                    sx={{width: '100%', mb: 2}}
                    >
                    {nationalities.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
                <TextField name="location" label="Location"  sx={{mb: 2}} onChange={handleLocation}/>
            </>
        : <></>}

      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} ref={ref}>
        Sign up
      </LoadingButton>
    </>
  );
}
