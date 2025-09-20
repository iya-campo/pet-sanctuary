import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import PetCard from './PetCard';
import PetDetails from './PetDetails';

const Announcements = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return <Stack py={2}>
      <Typography variant='body1'>Showing 1-6 of 97 results</Typography>
      <Grid container spacing={2}>
        <Grid size={4} onClick={handleOpen}>
          <PetCard imageUrl='' name='Max' type='Dog' breed='Golden Retriever' description='This is a lovely Golden Retriever who is looking for a new home. He is friendly, energetic, and loves to play fetch. He would make a great companion for anyone who enjoys an active lifestyle.' location='Calgary' date='12.01.2023' status='found' />
        </Grid>
        <Grid size={4}>
          <PetCard imageUrl='' name='Max' type='Dog' breed='Golden Retriever' description='This is a lovely Golden Retriever who is looking for a new home. He is friendly, energetic, and loves to play fetch. He would make a great companion for anyone who enjoys an active lifestyle.' location='Calgary' date='12.01.2023' status='found' />
        </Grid>
        <Grid size={4}>
          <PetCard imageUrl='' name='Max' type='Dog' breed='Golden Retriever' description='This is a lovely Golden Retriever who is looking for a new home. He is friendly, energetic, and loves to play fetch. He would make a great companion for anyone who enjoys an active lifestyle.' location='Calgary' date='12.01.2023' status='found' />
        </Grid>
        <Grid size={4}>
          <PetCard imageUrl='' name='Max' type='Dog' breed='Golden Retriever' description='This is a lovely Golden Retriever who is looking for a new home. He is friendly, energetic, and loves to play fetch. He would make a great companion for anyone who enjoys an active lifestyle.' location='Calgary' date='12.01.2023' status='found' />
        </Grid>
      </Grid>
      <PetDetails data={''} open={open} onClose={handleClose} />
  </Stack>
};

export default Announcements;
