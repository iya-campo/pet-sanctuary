import React, { ChangeEvent, useState } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack, TextField } from '@mui/material'
import { LocationOn } from '@mui/icons-material';

const Filter = () => {
    type Option = 'lost' | 'found';
    type Category = 'Dogs' | 'Cats' | 'Birds' | 'Others';

    const [option, setOption] = useState<Option>();
    const [category, setCategory] = useState<Category | ''>('');

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOption(event.target.value as Option);
    }

    const handleCategoryChange = (event: SelectChangeEvent<Category | ''>) => {
        setCategory(event.target.value as Category | '');
    }
  
    return (
    <Stack direction='row' alignItems='center' spacing={2}>
        <FormControl sx={{ flex: 1 }}>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={option}
                onChange={handleOptionChange}
                row
            >
                <FormControlLabel value="lost" control={<Radio />} label="Lost" />
                <FormControlLabel value="found" control={<Radio />} label="Found" />
            </RadioGroup>
        </FormControl>
        <TextField
            variant="outlined"
            sx={{ flex: 1, ml: 2 }}
            placeholder='Location'
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <LocationOn />
                    </InputAdornment>
                ),
            }}
        />
        <FormControl sx={{ flex: 1 }}>
            <Select
                id="category-select"
                variant='outlined'
                value={category}
                onChange={handleCategoryChange}
                displayEmpty
                renderValue={(selected: Category | '') => {
                    if (selected === "") return "Category";
                    return selected;
                }}
            >
                <MenuItem value="Dogs">Dogs</MenuItem>
                <MenuItem value="Cats">Cats</MenuItem>
                <MenuItem value="Birds">Birds</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
            </Select>
        </FormControl>
        <Button variant='contained' color='primary' sx={{ flex: 1 }}>
            View All
        </Button>
    </Stack>
  )
}

export default Filter