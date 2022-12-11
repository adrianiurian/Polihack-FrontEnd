import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Map from '../components/map';
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

export default function MapPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Map </title> {/* ADRIAN */}
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          City Map
        </Typography>
        <Map />
      </Container>
    </>
  );
}
