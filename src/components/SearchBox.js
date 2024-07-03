/**
 * input box for users to search characters by name.
 */

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const SearchBox = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle submission logic here
    console.log('Submitted value:', inputValue);
    // Reset input field
    setInputValue('');
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      Search by Name
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8} md={9}>
          <TextField
            id="input-field"
            variant="outlined"
            fullWidth
            value={inputValue}
            size="small"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4} md={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="medium"
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchBox;


