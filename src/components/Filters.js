/**
 * This component will allow users to select their filter criteria.
 */

import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, Checkbox, ListItemText, Box } from '@mui/material';
import SelectedFilters from './SelectedFilters'


const Filters = ({ onFilterChange }) => {

  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    onFilterChange(checkedItems);
  }, [checkedItems])

  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   onFilterChange(name, value);
  // };

  // Function to handle checkbox toggle
  const handleCheckboxToggle = (item, subItem) => {
    const isChecked = checkedItems[item.heading]?.includes(subItem) || false;
    if (isChecked) {
      // Item is already checked, remove it
      const newCheckedItems = {
        ...checkedItems,
        [item.heading]: checkedItems[item.heading].filter((checkedItem) => checkedItem !== subItem),
      };
      setCheckedItems(newCheckedItems);
    } else {
      // Item is not checked, add it
      const newCheckedItems = {
        ...checkedItems,
        [item.heading]: [...(checkedItems[item.heading] || []), subItem],
      };
      setCheckedItems(newCheckedItems);
    }
  };

  const data =
    [
      {
        heading: "species",
        subData: ["Human", "Alien"]
      },
      {
        heading: "gender",
        subData: ["Male", "Female"]
      },
      {
        heading: "origin",
        subData: ["Earth (C-137)", "unknown", "Earth (Replacement Dimension)", "Abadango"]
      }];


  return (
    <div>
      {data.map((item, index) => (
        <Box key={index} border={1} mb={3}>
          <Typography variant="h6" gutterBottom sx={{ paddingTop: "16px", paddingLeft: "16px" }}>
            {item.heading}
          </Typography>
          {/* Render checkboxes */}
          <List dense>
            {item.subData.map((subItem, subIndex) => (
              <ListItem key={subIndex} dense onClick={() => handleCheckboxToggle(item, subItem)}>
                <Checkbox
                  edge="start"
                  checked={checkedItems[item.heading]?.includes(subItem) || false}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={subItem} />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}

      <SelectedFilters
        checkedItems={checkedItems}

      />

    </div>



  );
};

export default Filters;

