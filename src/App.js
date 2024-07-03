import React, { useState, useEffect } from 'react';
import Filters from './components/Filters';
import SelectedFilters from './components/SelectedFilters';
import CharacterList from './components/CharacterList';
import SearchBox from './components/SearchBox';
import SortingBox from './components/SortingBox';
import axios from 'axios';
import { Container, Grid, Box, Card, CardHeader, CardContent } from '@mui/material';

const App = () => {
  const [filters, setFilters] = useState({ species: '', gender: '', origin: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null);
  const [characters, setCharacters] = useState(null);

  // useEffect(() => {
  //   fetchData();
  // }, [filters, searchQuery]);
  useEffect(() => {
    fetchData();

  }, [])
  useEffect(() => {
    console.log(data, "data");

  }, [data])
  const fetchData = async () => {
    // try {
    //   const response = await axios.get('https://rickandmortyapi.com/api/character/', {
    //     params: { species: filters.species, gender: filters.gender, origin: filters.origin, name: searchQuery }
    //   });
    //   setCharacters(response.data.results);
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character/');
      setData(response.data?.results);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    alert("call");
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  
  const handleSelectedSort = (sortValue) => {
    const newData = [...data];
    console.log(sortValue, 'sort-val');
    if (sortValue === "asc") {
      newData.sort((a, b) => a.id - b.id);
    } else if (sortValue === "desc") {
      newData.sort((a, b) => a.id - b.id);
      newData.reverse();
    }
    setData(newData);
  }

  return (
    <div className="app">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        // bgcolor="#f0f0f0"
        marginTop={4}
      >
        <Container>
          <Grid container spacing={3}>
            {/* Left section with filters */}
            <Grid item xs={12} md={3}>
              <Card style={{ border: 'none', boxShadow: 'none' }}>
                <CardHeader title="Filters" />
                <CardContent>
                  <Filters onFilterChange={handleFilterChange} />
                </CardContent>
              </Card>
            </Grid>

            {/* Center section with selected filter items */}
            <Grid item xs={12} md={9}>
              <Grid item xs={12} md={12} spacing={2}>
                <SelectedFilters filters={filters} />
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "24px" }}>
                <Grid item xs={12} md={8}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <SearchBox onSearchChange={handleSearchChange} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px', width: '100%' }}>
                    <SortingBox handleSelectedSort={handleSelectedSort} />
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} sx={{ marginTop: "24px" }}>
                <CharacterList data={data} />
              </Grid>
            </Grid>
          </Grid>
        </Container>

      </Box>

    </div>
  );
};

export default App;
