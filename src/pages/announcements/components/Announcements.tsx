import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import PetCard from './PetCard';
import PetDetails from './PetDetails';
import { Pet } from '@/types/Pet';

const Announcements = () => {
  const [announcements, setAnnouncements] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // Fetch announcements from the backend here
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/pets');
        const data = await response.json();
        // Update state with fetched announcements
        setAnnouncements([data[0]] as any);
        // console.log('test', data[0])
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  return <Stack py={2}>
      <Typography variant='body1'>Showing 1-6 of 97 results</Typography>
      <Grid container spacing={2}>
        {announcements?.length > 0 ? announcements.map((pet: Pet) => (
          <Grid size={4} key={pet.id} onClick={handleOpen}>
            <PetCard
              imageUrl={pet.imgUrl}
              name={pet.name}
              species={pet.species}
              breed={pet.breed}
              description={pet.desc}
              location={pet.location}
              date={pet.date}
              status={pet.status}
            />
          </Grid>
        )) : (
          <Typography>No announcements yet.</Typography>
        )}
      </Grid>
      <PetDetails data={''} open={open} onClose={handleClose} />
  </Stack>
};

export default Announcements;
