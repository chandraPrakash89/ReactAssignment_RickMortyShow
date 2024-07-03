import React, { useState } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const SortingBox = ({ handleSelectedSort }) => {
  const [value, setValue] = useState("")

  return (
    <Box sx={{ marginBottom: 2 }}>
      <FormControl fullWidth variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel id="sorting-label">Sorting</InputLabel>
        <Select
          labelId="sorting-label"
          id="sorting-select"
          value={value}
          onChange={
            (e) => {
              handleSelectedSort(e.target.value)
              setValue(e.target.value)
            }
          }
          label="Sorting"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortingBox;
