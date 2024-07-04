import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import SelectedFilters from './SelectedFilters';
import CharacterList from './CharacterList';
import SearchBox from './SearchBox';
import SortingBox from './SortingBox';
import axios from 'axios';
import { Container, Grid, Box, Card, CardHeader, CardContent } from '@mui/material';

const HomePage = () => {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState({});

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get('https://rickandmortyapi.com/api/character/');
            setData(response.data?.results);
            setFilterData((response.data?.results))

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to filter the results
    function filterResults(originalData, criteria) {
        // Check if originalData or checked item is null or undefined
        if (!originalData || !criteria) {
            return [];
        }
        if (typeof criteria === 'string') {
            //search on bases of name
            return originalData.filter(character =>
                character.name.toLowerCase().includes(criteria)
            );

        } else {
            //search on bases of filter obj
            return originalData.filter(character => {
                return (
                    (!criteria.species || criteria.species.includes(character.species)) &&
                    (!criteria.gender || criteria.gender.includes(character.gender)) &&
                    (!criteria.origin || criteria?.origin.includes(character.origin?.name))
                );
            });
        }
    }

    const handleFilterChange = async (checkedItems) => {
        setSelectedFilter(checkedItems)
        if (!checkedItems?.species?.length && !checkedItems?.gender?.length && !checkedItems?.origin?.length) {
            setFilterData(data);
            return;
        }
        const filteredResults = await filterResults(data, checkedItems);
        setFilterData(filteredResults);
    };

    const handleSearchChange = async (value) => {
        const nameFilter = await filterResults(data, value);
        setFilterData(nameFilter);
    };


    const handleSelectedSort = (sortValue) => {
        const newData = [...filterData];
        if (sortValue === "asc") {
            newData.sort((a, b) => a.id - b.id);
        } else if (sortValue === "desc") {
            newData.sort((a, b) => a.id - b.id);
            newData.reverse();
        }
        setFilterData(newData);
    }

    return (
        <div className="app">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
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
                                <SelectedFilters selectedFilter={selectedFilter} />

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
                                <CharacterList data={filterData} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>

            </Box>

        </div>
    );
};

export default HomePage;
