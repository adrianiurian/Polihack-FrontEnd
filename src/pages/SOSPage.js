import { Helmet } from 'react-helmet-async';

import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import axios from 'axios';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SOSPage() {
  const navigate = useNavigate();
  const mdUp = useResponsive('up', 'md');

  const [message, setMessage] = useState('');
  const ref = useRef(null);

  const geolocationAPI = navigator.geolocation;

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const getUserCoordinates = () => {
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
  getUserCoordinates();

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const postFirstMessage = async () => {
    const sendEmail = await axios.post(`http://127.0.0.1:5000/sos?type=1&lat=${lat}&lng=${lng}&username=r_alex1&message=`);
  }
  postFirstMessage();

  const handleClick = async () => {
    const sendEmail = await axios.post(`http://127.0.0.1:5000/sos?type=2&lat=${lat}&lng=${lng}&username=r_alex1&message=${message}`);
    const button = ref.current;
    button.style.backgroundColor = '#59FF88';
    button.style.color = '#000000';
    button.innerHTML = "SUCCESS!";
  };

  return (
    <>
      <Helmet>
        <title> Get help </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection sx={{background: '#FF5959'}}>
            <img src="/assets/icons/sos.svg" alt="login"/>
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
          <Typography variant="body2" sx={{ mb: 5, px: 2, py: 1, backgroundColor: '#59FF88', width: 'fit-content', borderRadius: 2, fontWeight: 'bold' }}>
              SUCCESSFULLY SENT!
            </Typography>
            <Typography variant="h4" gutterBottom>
              Your request has been successfully processed. We'll be with you in no time.
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don't panic. Stay calm, we'll get to you swiftly.
            </Typography>

            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold', fontSize: 16 }}>
              Please provide some details about your situation.
            </Typography>
            <TextField
              multiline
              rows={4}
              onChange={handleChange}
              value={message}
              sx={{ mb: 5 }}
            />
            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} ref={ref}>
              Send data
            </LoadingButton>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
