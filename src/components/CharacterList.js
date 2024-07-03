/**
 * will render each character's data fetched from the API.
 */

import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

function calculateYearsAgo(createdDate) {
  const currentDate = new Date(); // Current date
  const createdDateObj = new Date(createdDate); // Date object from the createdDate string

  const currentYear = currentDate.getFullYear(); // Current year
  const createdYear = createdDateObj.getFullYear(); // Year of the created date

  const yearsAgo = currentYear - createdYear;

  return `Created ${yearsAgo} year${yearsAgo !== 1 ? 's' : ''} ago`;
}

const ShowCard = ({ show }) => {
  const { name, id, created, status, gender, image, species, origin, location } = show;

  console.log('show', show);
  return (<Card>
    <CardMedia
      component="img"
      height="150"
      image={image}
      alt={name}
    />
    <CardContent sx={{ backgroundColor: '#6e6962fa', zIndex: 1, color: 'white' }}>
      <Typography variant="h6" component="div">
        {name}
      </Typography>
      <Typography variant="body1" style={{ fontSize: '12px' }}>
        id : {id} - {calculateYearsAgo(created)}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{paddingTop:"16px", fontSize: '12px'}}>
        <strong><span style={{color:"#E2DFD2"}}>STATUS:</span></strong> <span style={{color:"#FFBF00"}}>{status}</span><br /><hr/>
        <strong><span style={{color:"#E2DFD2"}}>SPECIES:</span></strong> <span style={{color:"#FFBF00"}}>{species}</span><br /><hr/>
        <strong><span style={{color:"#E2DFD2"}}>GENDER:</span></strong> <span style={{color:"#FFBF00"}}>{gender}</span><br /><hr/>
        <strong><span style={{color:"#E2DFD2"}}>ORIGIN:</span></strong> <span style={{color:"#FFBF00"}}>{origin.name}</span><br /><hr/>
        <strong><span style={{color:"#E2DFD2"}}>LAST LOCATION:</span></strong> <span style={{color:"#FFBF00"}}>{location.name}</span>
      </Typography>
    </CardContent>
  </Card>)
}



const CharacterList = (props) => {
  console.log(props, 'CharacterList'); 

  const { data } = props;

  return (
    <Grid container spacing={1}>
      {data && data.map((show) => (
        <Grid item xs={12} sm={6} md={3} key={show.id} sx={{ backgroundColor: '#000000c2', zIndex: 0 }}>
          <ShowCard show={show} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CharacterList;
