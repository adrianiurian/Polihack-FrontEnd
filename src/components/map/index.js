import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// ----------------------------------------------------------------------

Map.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string
  };

export default function Map({ title, subheader }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCLExl1X7GaaTroDpgMDoo1dk7pUm3Q2bE",
    });
    
    if (!isLoaded) return <div>Loading...</div>;
    return (
        <Card>
          <CardHeader title={title} subheader={subheader} />
          <MapComp />
        </Card>
    );
}

  function MapComp() {
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  
    return (
      <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
        <Marker position={center} />
      </GoogleMap>
    );
  }