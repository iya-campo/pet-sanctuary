import React, { ChangeEvent, useEffect, useState } from 'react'
import { FormControlLabel, Grid, Stack, Switch, Typography } from '@mui/material'
import AnnouncementPreview from './AnnouncementPreview'
import { Pet } from '@/types/Pet';
import { useAuth } from '@/hooks/useAuth';
import { PET_STATUS } from '@/constants/petConstants';
import PetDetails from './PetDetails';

const AnnouncementsSection = () => {
  const { user, fetchUserData } = useAuth();
  const [ editMode, setEditMode ] = useState<boolean>(false);
  const [ announcements, setAnnouncements ] = useState<Pet[]>();
  const [ petData, setPetData ] = useState<Pet>({} as Pet);
  const [ open, setOpen ] = useState(false);
  const [ showClosed, setShowClosed ] = useState(true);

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setShowClosed(event.target.checked);
  };

  const handleOpen = () => {
    setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
  }

  useEffect(() => {
    fetchAnnouncements();
  }, [user?.pets, showClosed]);

  const fetchAnnouncements = async () => {
    if (showClosed)
      setAnnouncements(user?.pets);
    else 
      setAnnouncements(user?.pets?.filter((announcement: Pet) => announcement.type !== PET_STATUS.CLOSED));
  };

  const handlePetChange = async () => {
    await fetchUserData(user?.email || '');
  }

  return (
    <Stack spacing={2}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6'>My Announcements</Typography>
          <FormControlLabel
            control={<Switch checked={showClosed} onChange={handleToggle} />}
            label="Show Closed"
          />
        </Stack>
        <Stack>
          <Grid container spacing={2}>
            {announcements && announcements?.length > 0 ? announcements.map((pet: Pet) => (
              <Grid size={6} key={pet?.id} sx={{ cursor: 'pointer' }} onClick={() => {
                setPetData(pet);
                handleOpen();
              }}>
                <AnnouncementPreview 
                  status={pet?.type}
                  name={pet?.name}
                  desc={pet?.desc}
                  date={pet?.createdAt}
                  imgUrl={pet?.imgUrl}
                />
              </Grid>
            )) : (
              <Typography>No announcements yet.</Typography>
            )}
          </Grid>
          <PetDetails 
            pet={petData} 
            open={open} 
            onClose={handleClose} 
            editMode={editMode} 
            setEditMode={setEditMode} 
            onPetChange={handlePetChange}
          />
        </Stack>
    </Stack>
  )
}

export default AnnouncementsSection
