import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { filterFields } from '../../utils/filterUtils';

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    role: '',
    location: '',
    experience: '',
    companyName: '',
    techStack: '',
    minBasePay: '',
    remote: false,
  });

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    const newFilters = { ...filters, [name]: value };
    onFilterChange(newFilters);
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingBottom: '40px',
          paddingTop: '10px',
          gap: '50px',
        }}
      >
        {/* Filter Fields */}
        {filterFields.map((field) => (
          <TextField
            key={field.id}
            type={
              field.name === 'experience' || field.name === 'minBasePay'
                ? 'number'
                : 'text'
            }
            name={field.name}
            label={field.label}
            variant='outlined'
            value={filters[field.name]}
            onChange={(e) => handleFilterChange(field.name, e.target.value)}
            InputProps={{
              style: {
                borderRadius: '15px',
              },
            }}
          />
        ))}
        {/* checkbox for showing remote jobs  */}
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.remote}
              onChange={(e) => handleFilterChange('remote', e.target.checked)}
              name='remote'
              color='primary'
              style={{
                borderRadius: '20px',
              }}
            />
          }
          label='Remote'
        />
      </Box>
    </div>
  );
};

export default Filters;
