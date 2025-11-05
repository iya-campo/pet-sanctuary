import React, { ChangeEvent } from 'react'
import { Button, FormControl, FormControlLabel, InputAdornment, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack, TextField } from '@mui/material'
import { LocationOn } from '@mui/icons-material';
import { PetSpecies, PetStatus } from '@/types/Pet';
import { capitalize } from '@/util/commonUtils';
import { PET_SPECIE, PET_STATUS } from '@/constants/petConstants';

interface FilterProps {
    status: PetStatus;
    species: PetSpecies;
    handleStatusChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSpeciesChange: (event: SelectChangeEvent<PetSpecies>) => void;
    handleClearFilters: () => void;
}

const Filter = ({ status, species, handleStatusChange, handleSpeciesChange, handleClearFilters }: FilterProps) => {
    return (
        <Stack direction='row' alignItems='center' spacing={2}>
            <FormControl sx={{ flex: 1.5 }}>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={status}
                    onChange={handleStatusChange}
                    sx={{ justifyContent: 'space-around' }}
                    row
                >
                    <FormControlLabel value={PET_STATUS.LOST} control={<Radio />} label="Lost" />
                    <FormControlLabel value={PET_STATUS.FOUND} control={<Radio />} label="Found" />
                    <FormControlLabel value={PET_STATUS.FOR_ADOPTION} control={<Radio />} label="For Adoption" />
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
                    id="species-select"
                    variant='outlined'
                    value={species}
                    onChange={handleSpeciesChange}
                    displayEmpty
                    renderValue={(selected: PetSpecies) => {
                        if (selected === "" as PetSpecies) return "Species";
                        return `${capitalize(selected)}s`;
                    }}
                >
                    <MenuItem value={PET_SPECIE.DOG}>Dogs</MenuItem>
                    <MenuItem value={PET_SPECIE.CAT}>Cats</MenuItem>
                    <MenuItem value={PET_SPECIE.BIRD}>Birds</MenuItem>
                    <MenuItem value="OTHERS">Others</MenuItem>
                </Select>
            </FormControl>
            <Button variant='contained' color='primary' sx={{ flex: 1 }} onClick={handleClearFilters}>
                View All
            </Button>
        </Stack>
    )
}

export default Filter