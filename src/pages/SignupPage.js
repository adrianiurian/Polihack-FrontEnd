import { Helmet } from 'react-helmet-async';

import { useRef, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { SignupForm } from '../sections/auth/signup';

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

export default function SignupPage() {
  const navigate = useNavigate();
  const mdUp = useResponsive('up', 'md');

  const providerRef = useRef(null);
  const refugeeRef = useRef(null);
  const [userType, setUserType] = useState('provider');

  const handleUserType1 = () => {
    providerRef.current.style.backgroundColor = '#2065D1';
    providerRef.current.style.color = 'white';
    refugeeRef.current.style.backgroundColor = 'rgba(145, 158, 171, 0.08)';
    refugeeRef.current.style.color = 'black';
    setUserType('provider');
  }


  const handleUserType2 = () => {
    refugeeRef.current.style.backgroundColor = '#2065D1';
    refugeeRef.current.style.color = 'white';
    providerRef.current.style.backgroundColor = 'rgba(145, 158, 171, 0.08)';
    providerRef.current.style.color = 'black';
    setUserType('refugee');
  }

  return (
    <>
      <Helmet>
        <title> Sign Up </title>
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
          <StyledSection sx={{background: '#2065D1'}}>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5, color: 'white' }}>
              Hi, Welcome to Refp!
            </Typography>
            <img src="/assets/icons/ic_signup.png" alt="signup" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Welcome! Let's get you started.
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Already have an account? {''}
              <Link variant="subtitle2" onClick={() => navigate('/login')} sx={{cursor: 'pointer'}}>Log in</Link>
            </Typography>

            <Typography variant="h6" sx={{ mb: 1 }}>
              How are you planning to use the platform?          
            </Typography>
            <Stack direction="row" spacing={2} sx={{mb: 3}}>
              <Button fullWidth size="large" color="inherit" variant="outlined" ref={providerRef} onClick={handleUserType1} sx={{backgroundColor: '#2065D1', color: 'white'}}>
                Provider
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined" ref={refugeeRef} onClick={handleUserType2}>
                Refugee
              </Button>
            </Stack>

            <SignupForm userType={userType} />  
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
