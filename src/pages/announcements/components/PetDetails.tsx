import React, { useState } from 'react'
import { Box, Button, CircularProgress, Divider, Modal, Stack, Typography } from '@mui/material';
import { ArrowLeft, ArrowRight, Favorite, Message } from '@mui/icons-material';
import { Pet } from '@/types/Pet';
import { capitalize, formatDate } from '@/util/commonUtils';
import { PET_STATUS } from '@/constants/petConstants';
import { useAuth } from '@/hooks/useAuth';
import DynamicField from '@/components/DynamicField';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import { LoadingStatus } from '@/types/Loading';
import { LOADING_STATUS } from '@/constants/loadingConstants';

interface PetDetailsProps {
    pet: Pet;
    open: boolean;
    onClose: () => void;
    onChange?: () => void;
}

const PetDetails = ({ pet, open, onClose, onChange }: PetDetailsProps) => {
  const { user, isAuthenticated } = useAuth();
  const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
  const [loading, setLoading] = useState<LoadingStatus>(LOADING_STATUS.IDLE);

  const handleAdoptPet = async () => {
    setLoading(LOADING_STATUS.PENDING);
    const response = await fetch(`/pet-sanctuary/api/pets/adopt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            petId: pet.id,
            adopterId: user?.id,
        })
    });

    if (response.ok) {
        setLoading(LOADING_STATUS.SUCCESS);
        onChange?.();
        onClose();
        setLoading(LOADING_STATUS.IDLE);
    } else {
        setLoading(LOADING_STATUS.ERROR);
        console.error("Error adopting pet.");
    }  
  }

  const handleSendMessage = () => {
    // Implement message sending functionality
    console.log("Send message to pet owner.");
  }

  const handleOpenDialog = () => setDialogOpen(true)

  return (
    <Modal open={open} onClose={onClose}>
        <Box bgcolor='white' position='absolute' top='50%' left='50%' sx={{ transform: 'translate(-50%, -50%)' }} maxHeight='80vh' overflow='auto' p={4} borderRadius={2}>
            <Stack direction='row' columnGap={6} rowGap={6} my={2}>
                <Stack spacing={2} flex='1 0 550px'>
                    <Stack direction='row' spacing={2}>
                        <Stack spacing={2}>
                            <Box height={150} width={150} bgcolor='#ddd'></Box>
                            <Box height={150} width={150} bgcolor='#ddd'></Box>
                            <Box height={150} width={150} bgcolor='#ddd'></Box>
                        </Stack>
                        <Box bgcolor='#ddd' flex={1}></Box>
                    </Stack>
                    <Stack direction='row' alignSelf='center' alignItems='center' spacing={2}>
                        <Button variant='contained' size='small'><ArrowLeft /></Button>
                        <Typography>01</Typography>
                        <Typography>02</Typography>
                        <Typography>03</Typography>
                        <Button variant='contained' size='small'><ArrowRight /></Button>
                    </Stack>
                    <Box>
                        <DynamicField label='desc' value={pet?.desc || ''} hideLabel />
                    </Box>
                </Stack>
                <Stack spacing={1} flex='1 0 300px'>
                    <Stack pb={2}>
                        <Stack direction='row' justifyContent='space-between' alignItems='space-between'>
                            <Typography variant='h4'>Details</Typography>
                        </Stack>
                        <Typography variant='h6'>{`${pet?.type === PET_STATUS.FOR_ADOPTION ? 'For Adoption' : capitalize(pet?.type)} / ${capitalize(pet?.name ? pet.name : pet?.species)}`}</Typography>
                    </Stack>
                    <DynamicField label='ID' value={pet?.id?.toString()} />
                    <DynamicField label='species' value={capitalize(pet?.species)} />
                    <DynamicField label='name' value={pet?.name} />
                    <DynamicField label='breed' value={pet?.breed} />
                    <DynamicField label='location' value={pet?.location} />
                    <DynamicField label='date' value={formatDate(pet?.createdAt?.toString())} />
                    <Divider />
                    <DynamicField label='contact' value={pet?.user?.email} />
                    <DynamicField label='mobile' value={pet?.user?.mobile} />
                    <Typography variant='body1'>We provide free services for publishing announcements about lost and found animals. To see the phone number, you need to register.</Typography>
                    <Stack direction='row' spacing={2} py={4}>
                        <Button variant='outlined' startIcon={<ArrowLeft />} onClick={onClose}>Back</Button>
                        {(pet?.type === PET_STATUS.FOR_ADOPTION && pet?.userId !== user?.id) ? (
                            <Box position='relative'>
                                <Button 
                                    color='primary' 
                                    variant='contained' 
                                    startIcon={loading === LOADING_STATUS.IDLE ? <Favorite /> : null} 
                                    disabled={!isAuthenticated}  
                                    onClick={handleOpenDialog}
                                    sx={{ height: 50, width: 140 }}>
                                    {loading === LOADING_STATUS.IDLE ? 'Adopt Me' : <CircularProgress color='inherit' sx={{ p: 1 }} />}
                                </Button>
                                {!isAuthenticated && <Typography variant='body2' color='textSecondary' sx={{ position: 'absolute', bottom: -24, fontStyle: 'italic' }}>Login to adopt</Typography>}
                            </Box>
                        ) : pet?.userId !== user?.id ? (
                            <Box position='relative'>
                                <Button 
                                    variant='contained' 
                                    startIcon={<Message />} disabled={!isAuthenticated} onClick={handleSendMessage}>Send a message</Button>
                                {!isAuthenticated && <Typography variant='body2' color='textSecondary' sx={{ position: 'absolute', bottom: -24, fontStyle: 'italic' }}>Login to send a message</Typography>}
                            </Box>
                        ) : null}
                    </Stack>
                </Stack>
            </Stack>
            <ConfirmationDialog
                keepMounted
                open={dialogOpen}
                id='adopt-pet-dialog'
                title='Adopt Pet'
                message='Are you sure you want to adopt this pet?'
                onConfirm={handleAdoptPet}
                onClose={() => setDialogOpen(false)}
            />
        </Box>
    </Modal>
  )
}

export default PetDetails