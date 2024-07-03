/**
 * display the currently selected filters at the top of the screen and allows users to clear them..
 */
import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const SelectedFilters = (props) => {
  const { checkedItems } = props;

  console.log("checkedItems->", checkedItems);

  // Initialize state for filters using props
  const [filters, setFilters] = useState([]);

  // Effect to update filters when checkedItems prop changes
  useEffect(() => {
    if (checkedItems) {
      // Build filters array based on checkedItems
      const newFilters = Object.keys(checkedItems).reduce((acc, key) => {
        if (checkedItems[key].length > 0) {
          checkedItems[key].forEach((item) => {
            acc.push({
              id: `${key}-${item}`, // Create unique ID based on key and item
              name: `${key}: ${item}`, // Use key and item as filter name
              type: key, // Store the type for future use if needed
              value: item // Store the value for future use if needed
            });
          });
        }
        return acc;
      }, []);
      setFilters(newFilters);
    }
  }, [checkedItems]);

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
        <Typography variant="h6" gutterBottom sx={{ marginTop: "16px" }}>
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
