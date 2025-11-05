import React, { useState } from 'react';
import { Box, CircularProgress, FormControl, Grid, IconButton, ListItemText, MenuItem, Pagination, Select, Stack, Typography } from '@mui/material';
import PetCard from './PetCard';
import PetDetails from './PetDetails';
import { Pet } from '@/types/Pet';
import { LoadingStatus } from '@/types/Loading';
import { LOADING_STATUS } from '@/constants/loadingConstants';
import { SwapVert } from '@mui/icons-material';

interface AnnouncementProps {
    pets: Pet[];
    totalCount: number;
    limit: number;
    page: number;
    sortBy: string;
    sortOrder: string;
    loading?: LoadingStatus;
    handlePageChange: (newPage: number) => void; 
    handleSortChange: (newSortBy: string, newSortOrder: string) => void;
    onUpdate: (pets?: Pet[]) => void;
}

const Announcements = ({ 
  pets, 
  totalCount, 
  limit, 
  page, 
  sortBy,
  sortOrder,
  loading, 
  handlePageChange,
  handleSortChange,
  onUpdate }: AnnouncementProps) => {
  const [petData, setPetData] = useState<Pet>({} as Pet);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handlePetSelect = (pet: Pet) => {
    setPetData(pet);
    handleOpen();
  }

  return (
    <Stack py={2}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Pagination 
            count={Math.ceil(totalCount / limit)} 
            page={page} 
            onChange={(e, value: number) => handlePageChange(value)} 
          />
          <Typography variant='body1'>
            {`Showing ${((page - 1) * limit) + 1}-${Math.min(page * limit, totalCount)} of ${totalCount} results`}
          </Typography>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography variant='overline'>Sort By</Typography> 
            <FormControl sx={{ width: 200 }}>
              <Select
                labelId="sort-label"
                id="sort-dropdown"
                size="small"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value, sortOrder)}
              >
                <MenuItem value="createdAt">
                  <ListItemText primary="Date" />
                </MenuItem>
                <MenuItem value="Name">
                  <ListItemText primary="Name" />
                </MenuItem>
              </Select>
            </FormControl>
            <IconButton onClick={() => {
              const order = sortOrder === 'asc' ? 'desc' : 'asc';
              handleSortChange(sortBy, order)
            }}>
              <SwapVert color={sortOrder === 'desc' ? 'primary' : 'inherit'} />
            </IconButton>
          </Stack>
        </Stack>
        {loading === LOADING_STATUS.PENDING && 
          <Box display="flex" justifyContent="center" alignItems="center" my={2}>
            <CircularProgress />
          </Box>
        }
        {loading === LOADING_STATUS.SUCCESS &&
          <Grid container spacing={2} mt={2}>
            {pets?.length > 0 ? pets.map((pet: Pet) => (
              <Grid size={4} key={pet.id} onClick={() => handlePetSelect(pet)}>
                <PetCard
                  imageUrl={pet.imgUrl}
                  name={pet.name}
                  species={pet.species}
                  breed={pet.breed}
                  description={pet.desc}
                  location={pet.location}
                  date={pet.createdAt.toString()}
                  status={pet.type}
                />
              </Grid>
            )) : (
              <Typography>No announcements yet.</Typography>
            )}
          </Grid>
        }
        <PetDetails pet={petData} open={open} onClose={handleClose} onChange={onUpdate} />
    </Stack>
  )
};

export default Announcements;
