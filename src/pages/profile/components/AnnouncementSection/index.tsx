import { Grid, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import AnnouncementPreview from './AnnouncementPreview'
import { Pet } from '@/types/Pet';

const AnnouncementsSection = () => {
  const [announcements, setAnnouncements] = React.useState<Pet[]>([]);

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

  return (
    <Stack spacing={2}>
        <Typography variant='h6'>My Announcements</Typography>
        <Stack>
          <Grid container spacing={2}>
            {announcements?.length > 0 ? announcements.map((pet: Pet) => (
              <Grid size={6} key={pet.id}>
                <AnnouncementPreview 
                  status={pet.status}
                  name={pet.name}
                  desc={pet.desc}
                  date={pet.date}
                  imgUrl={pet.imgUrl}
                />
              </Grid>
            )) : (
              <Typography>No announcements yet.</Typography>
            )}
          </Grid>
            {/* <Typography>No announcements yet.</Typography> */}
        </Stack>
    </Stack>
  )
}

export default AnnouncementsSection
