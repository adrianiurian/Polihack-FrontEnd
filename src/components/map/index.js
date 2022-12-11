import axios from 'axios'
import { React, useMemo, useEffect, useState} from "react";

import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import PropTypes from 'prop-types';

// @mui
import { Card, CardHeader, Box } from '@mui/material';
// ----------------------------------------------------------------------

Map.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string
  };

const center = { lat: 46.750344, lng: 23.592517 };

export default function Map({ title, subheader }) {

    const [mapData, setMapData] = useState (null);
    const [hospitalData, setHospData] = useState ('');
    // const [selected, setSelected] = useState(null);

    // const [selected, setSelected] = React.useState(null);

    const getHousesData = async () =>{
      const lat = 46.750344;
      const long = 23.592517;
      const response = await axios.get(`http://127.0.0.1:5000/nearby_homes?lat=${lat}&lng=${long}&radius=100&min_residents=1`);
      console.log(response.data);
      return response.data;
    }
    const getHospitalData = async () =>{
      const lat = 46.750344;
      const long = 23.592517;
      const response = await axios.get(`http://127.0.0.1:5000/nearby_hospitals?lat=${lat}&lng=${long}&radius=10000`);
      console.log(response.data);
      return response.data;
    }

    useEffect(()=> {
      async function fetchData() {
        const DataArrayHouse = await getHousesData();
        setMapData(DataArrayHouse);
      };
      fetchData();
    }, []);

    useEffect(()=> {
      async function fetchData() {
        const DataArrayHospital = await getHospitalData();
        setHospData(DataArrayHospital);
      };
      fetchData();
    }, []);

    const mapOptions = {
      fullscreenControl: false,
      fullscreenControlOptions: {
        position: 10,
      },
      disableDefaultUI: true,
      styles: [
        {
          featureType: "transit",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          stylers: [{ visibility: "on" }],
        },
      ],
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAluMpHB-EMOFU0QBuc2CGvChaj43jpSZ0",
    });

    if (!mapData || !isLoaded) return <div>Loading...</div>;
    return (
        <Card sx={{height: '60vh'}}>
          <GoogleMap 
            zoom={13} 
            center={center} 
            mapContainerClassName="map-container"
            options={mapOptions}>
            {mapData.map((m, index) => (
              <Marker 
                key={index}
                icon="/ic_house.png"
                index={m.index}
                position={{ lat:parseFloat(m.location.lat), lng: parseFloat(m.location.lng)}} 
             />
            ))}
            {/* {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <h2>Garbage</h2>
                </div>
              </InfoWindow>
            ) : <Box />} */}
            {/* {hospitalData.map((m, index) => (
              <Marker
                key={index}
                icon="/ic_hospital.png"
                index={m.index}
                position={{ lat:parseFloat(m.coords.lat), lng: parseFloat(m.coords.lng)}} 
             />
            ))} */}
            
          </GoogleMap>
        </Card>
    );
}

  