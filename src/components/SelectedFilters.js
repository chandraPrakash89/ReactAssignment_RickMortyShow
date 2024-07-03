/**
 * display the currently selected filters at the top of the screen and allows users to clear them..
 */



import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SelectedFilters = () => {
  const [filters, setFilters] = useState([
    { id: 1, name: 'Filter 1' },
    { id: 2, name: 'Filter 2' },
    { id: 3, name: 'Filter 3' },
    { id: 4, name: 'Filter 4' },
  ]);

  const handleRemoveFilter = (id) => {
    const updatedFilters = filters.filter((filter) => filter.id !== id);
    setFilters(updatedFilters);
  };

  const handleMoveToTop = (id) => {
    const selectedFilter = filters.find((filter) => filter.id === id);
    const updatedFilters = filters.filter((filter) => filter.id !== id);
    setFilters([selectedFilter, ...updatedFilters]);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom sx={{marginTop:"16px"}}>
          Selected Filters:
        </Typography>
        {filters.map((filter) => (
          <Chip
            key={filter.id}
            label={filter.name}
            onDelete={() => handleRemoveFilter(filter.id)}
            onClick={() => handleMoveToTop(filter.id)}
            style={{ marginRight: 8, marginBottom: 8 }}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default SelectedFilters;

