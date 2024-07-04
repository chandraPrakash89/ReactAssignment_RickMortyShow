/**
 * display the currently selected filters at the top of the screen.
 */
import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const SelectedFilters = (props) => {
  const { selectedFilter } = props;
  const [filters, setFilters] = useState([]);

  // const handleRemoveFilter = (id) => {
  //   const updatedFilters = filters.filter((filter) => filter.id !== id);
  //   setFilters(updatedFilters);
  // };

  const handleMoveToTop = (id) => {
    const selectedFilters = filters.find((filter) => filter.id === id);
    const updatedFilters = filters.filter((filter) => filter.id !== id);
    setFilters([selectedFilters, ...updatedFilters]);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ marginTop: "16px" }}>
          Selected Filters:
        </Typography>

        {selectedFilter && Object.keys(selectedFilter).map((key) => (
          selectedFilter[key].map((value, index) => (
            <Chip
              key={`${key}-${index}`}  // Use a unique key for each chip
              label={`${key}: ${value}`}  // Display key and value
              // onDelete={() => handleRemoveFilter(key, value)}  
              onClick={() => handleMoveToTop(key, value)}
              style={{ marginRight: 8, marginBottom: 8 }}
            />
          ))
        ))}
      </Grid>
    </Grid>
  );
};

export default SelectedFilters;
