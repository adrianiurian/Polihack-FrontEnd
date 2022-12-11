import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  name: PropTypes.string,
  cover: PropTypes.string,
  distance: PropTypes.number,
  max_residents: PropTypes.string,
  status: PropTypes.string,
};

export default function ShopProductCard({ name, cover, distance, maxResidents, status, link }) {
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative', cursor: 'pointer' }} onClick={()=> window.open(link, "_blank")}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'new' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <StyledProductImg alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3, cursor: 'pointer' }}>
        <Link color="inherit" underline="hover">
          <Typography variant="h5" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle3" sx={{fontSize: 14}}>
            {distance} km
          </Typography>
          <Typography variant="subtitle2" sx={{fontSize: 14, px: 1, py: 0.5, backgroundColor: 'rgba(145, 158, 171, 0.12)', width: 'fit-content', borderRadius: 1, fontWeight: 'bold' }}>
            Max {maxResidents} people
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
