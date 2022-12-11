import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {
  const [housesData, setHousesData] = useState();

  const getHousesData = async () =>{
    const response = await axios.get(`http://127.0.0.1:5000/nearby_homes?lat=${46.7695924}&lng=${23.5974124}&radius=100&min_residents=1`);
    setHousesData(response.data);
    console.log(response.data);
    return response.data;
  }

  useEffect(()=> {
    async function fetchData() {
      const DataArray = await getHousesData();
      setHousesData(DataArray);
    };
    fetchData();
  }, []);
  if (housesData) {
    return (
      <Grid container spacing={3} {...other}>
        {housesData.map((house) => (
          <Grid key={house.id} item xs={12} sm={6} md={3}>
            <ShopProductCard name={house.street_name} cover={house.location_image} distance={house.distance} maxResidents={house.max_residents} status={house.new === "1" ? "new" : ""} link={house.google_maps} />
          </Grid>
        ))}
      </Grid>
    );
  }
}
