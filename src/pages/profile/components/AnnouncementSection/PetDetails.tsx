import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Divider, IconButton, Modal, Stack, Typography } from '@mui/material';
import { ArrowLeft, ArrowRight, Check, Delete, DoneAll, Edit } from '@mui/icons-material';
import { Gender, Pet, PetSpecies } from '@/types/Pet';
import { capitalize, formatDate } from '@/util/commonUtils';
import { PET_SPECIE, PET_STATUS } from '@/constants/petConstants';
import { useAuth } from '@/hooks/useAuth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DynamicField from '@/components/DynamicField';
import ConfirmationDialog, { ConfirmationDialogProps } from '@/components/ConfirmationDialog';
import { LoadingStatus } from '@/types/Loading';
import { LOADING_STATUS } from '@/constants/loadingConstants';
import { BASE_URL } from '@/constants/apiConstants';

interface PetDetailsProps {
    pet: Pet;
    open: boolean;
    onClose: () => void;
    editMode?: boolean;
    setEditMode?: (mode: boolean) => void;
    onChange?: () => void;
}

type FormData = {
    name: string;
    age: number;
    gender: Gender;
    species: PetSpecies;
    breed: string;
    location: string;
    desc: string;
    imageUrls: string;
}

const PetDetails = ({ pet, open, onClose, editMode, setEditMode, onChange }: PetDetailsProps) => {
  const { user } = useAuth();
  const [ loading, setLoading ] = useState<LoadingStatus>(LOADING_STATUS.IDLE);
  
  const imageArray = Array.from({ length: 4 }, (_, index) => pet.imageUrls?.split(',')[index] || '');
  const [ selectedImageIndex, setSelectedImageIndex ] = useState<number>(0);
  const [ lastImageIndex, setLastImageIndex ] = useState<number>(0);

  const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
  const [ dialogProps, setDialogProps ] = useState<Partial<ConfirmationDialogProps>>({
    id: 'dialog-id',
    title: 'Dialog Title',
    message: 'Are you sure you want to proceed?',
    onConfirm: async () => {},
  })

  useEffect(() => {
    setSelectedImageIndex(0);
    setLastImageIndex(0);
  }, [pet])

  const formik = useFormik<FormData>({
    enableReinitialize: true,
    initialValues: {
        name: pet?.name || '',
        age: pet?.age || 0,
        gender: pet?.gender || '' as Gender,
        species: pet?.species || '' as PetSpecies,
        breed: pet?.breed || '',
        location: pet?.location || '',
        desc: pet?.desc || '',
        imageUrls: pet?.imageUrls || '',
    },
    validationSchema: Yup.object({
        name: Yup.string().required('Name is required'),
        age: Yup.string().required('Age is required'),
        breed: Yup.string().required('Breed is required'),
        // coat: Yup.string().required('Coat is required'),
        location: Yup.string().required('Location is required'),
    }),
    onSubmit: (values) => {
        console.log('Form data updated:', values);
        handleUpdatePet({ ...values } as Partial<Pet>);
    },
  });

  const handleEditMode = () => {
    setEditMode?.(!editMode);
    if (editMode) formik.submitForm();
  }

  const handleUpdatePet = async (updatedPet: Partial<Pet>) => {
    setLoading(LOADING_STATUS.PENDING);
    const response = await fetch(`/api/pets/${pet.id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(updatedPet) 
    });
    
    if (response.ok) {
        setLoading(LOADING_STATUS.SUCCESS);
        onChange?.();
    } else {
        setLoading(LOADING_STATUS.ERROR);
        console.error("Error updating pet.");
    }
  }

  const handleDeletePet = async () => {
    setLoading(LOADING_STATUS.PENDING);
    const response = await fetch(`/api/pets/${pet.id}`, { method: 'DELETE' });

    if (response.ok) {
        setLoading(LOADING_STATUS.SUCCESS);
        onChange?.();
        onClose();
    } else {
        setLoading(LOADING_STATUS.ERROR);
        console.error("Error deleting pet.");
    }   
  }

  const handleMarkClosed = async (closedPet: Partial<Pet>) => {
    setLoading(LOADING_STATUS.PENDING);
    const response = await fetch(`/api/pets/${pet.id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({
            ...closedPet,
            type: PET_STATUS.CLOSED,
        }) 
    });
    
    if (response.ok) {
        setLoading(LOADING_STATUS.SUCCESS);
        onChange?.();
        onClose();
    } else {
        setLoading(LOADING_STATUS.ERROR);
        console.error("Error closing pet.");
    }
  }

  const handleOpenDialog = (dialogProps: Partial<ConfirmationDialogProps>) => {
    setDialogOpen(true);
    setDialogProps({
        id: dialogProps.id,
        title: dialogProps.title,
        message: dialogProps.message,
        onConfirm: dialogProps.onConfirm,
    })
  }

  const handleImageSelect = (imageIndex: number) => {
    setSelectedImageIndex((prev) => {
        setLastImageIndex(prev);
        return imageIndex;
    });
  }

  return (
    <Modal open={open} onClose={onClose}>
        <Box position='relative' top='50%' left='50%' sx={{ transform: 'translate(-50%, -50%)' }} maxHeight='80vh' maxWidth='100vh' overflow='auto' bgcolor='white' borderRadius={2}>
            {loading === LOADING_STATUS.PENDING && 
                <Box display='flex' justifyContent='center' alignItems='center' position='absolute' bgcolor='rgba(221, 221, 221, 0.5)' height='100%' width='100%' borderRadius={2} zIndex={1}>
                    <CircularProgress />
                </Box>
            }
            <Stack direction='row' columnGap={6} rowGap={6} my={2} p={4}>
                <Stack spacing={2} flex='1 0 500px'>
                    <Stack direction='row' spacing={2}>
                        <Stack spacing={2}>
                            {imageArray.slice(1).map((image, index) => (
                                <Box 
                                    key={image}
                                    height={150} 
                                    width={150} 
                                    bgcolor='#ddd' 
                                    onClick={() => image ? handleImageSelect(index + 1) : null}
                                    sx={{
                                        backgroundImage: `url(${BASE_URL}${image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        cursor: image ? 'pointer' : 'default',
                                    }}
                                />
                            ))}
                        </Stack>
                        <Box 
                            flex={1}
                            bgcolor='#ddd' 
                            sx={{
                                backgroundImage: `url(${BASE_URL}${pet?.imageUrls?.split(',')[selectedImageIndex]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />
                    </Stack>
                    <Stack direction='row' alignSelf='center' alignItems='center' spacing={2}>
                        <Button variant='contained' size='small'><ArrowLeft /></Button>
                        <Typography>01</Typography>
                        <Typography>02</Typography>
                        <Typography>03</Typography>
                        <Button variant='contained' size='small'><ArrowRight /></Button>
                    </Stack>
                    <Box>
                        <DynamicField label='desc' value={formik.values.desc || ''} formik={formik} editMode={editMode} hideLabel />
                    </Box>
                </Stack>
                <Stack spacing={1} flex='1 0 300px'>
                    <Stack pb={2}>
                        <Stack direction='row' justifyContent='space-between' alignItems='space-between'>
                            <Typography variant='h4'>Details</Typography>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                {user?.id === pet?.userId && (
                                    <>
                                        <IconButton onClick={handleEditMode}>
                                            {editMode ? (<Check />) : (<Edit />)}
                                        </IconButton>
                                        <IconButton onClick={() => handleOpenDialog({
                                            id: 'remove-pet-dialog',
                                            title: 'Remove Pet',
                                            message: 'Are you sure you want to remove this pet entry?',
                                            onConfirm: handleDeletePet,
                                        })}>
                                            <Delete />
                                        </IconButton>
                                    </>
                                )}
                            </Stack>
                        </Stack>
                        <Typography variant='h6'>{`${pet?.type === PET_STATUS.FOR_ADOPTION ? 'For Adoption' : capitalize(pet?.type)} / ${capitalize(pet?.name ? pet?.name : pet?.species)}`}</Typography>
                    </Stack>
                    <DynamicField label='ID' value={pet?.id?.toString()} />
                    <DynamicField label='species' value={capitalize(formik.values.species)} formik={formik} editMode={editMode} formType='option' 
                        formOptions={[
                            PET_SPECIE.DOG,
                            PET_SPECIE.CAT,
                            PET_SPECIE.BIRD,
                            PET_SPECIE.OTHERS,
                        ]} 
                    />
                    <DynamicField label='name' value={formik.values.name} formik={formik} editMode={editMode} />
                    <DynamicField label='breed' value={formik.values.breed} formik={formik} editMode={editMode} />
                    <DynamicField label='location' value={formik.values.location} formik={formik} editMode={editMode} />
                    <DynamicField label='date' value={formatDate(pet?.createdAt?.toString())} />
                    <Divider />
                    <DynamicField label='contact' value={user?.email as string} />
                    <DynamicField label='mobile' value={user?.mobile as string} />
                    <Typography variant='body1'>We provide free services for publishing announcements about lost and found animals. To see the phone number, you need to register.</Typography>
                    <Stack direction='row' spacing={2} py={4}>
                        <Button variant='outlined' startIcon={<ArrowLeft />} onClick={onClose}>Back</Button>
                        {pet?.type !== PET_STATUS.FOR_ADOPTION ? ( 
                            <Button 
                                variant='contained' 
                                startIcon={<DoneAll />} 
                                onClick={() => handleOpenDialog({
                                    id: 'close-pet-dialog',
                                    title: 'Mark as Closed',
                                    message: 'Are you sure you want to mark this pet entry as closed?',
                                    onConfirm: () => handleMarkClosed(pet),
                                })}
                                disabled={pet?.type === PET_STATUS.CLOSED}>
                                {pet?.type !== PET_STATUS.CLOSED ? 'Mark Closed' : 'Closed'}
                            </Button>
                        ) : null}
                    </Stack>
                </Stack>
            </Stack>
            <ConfirmationDialog
                keepMounted
                open={dialogOpen}
                id={dialogProps.id as string}
                title={dialogProps.title}
                message={dialogProps.message as string}
                onConfirm={dialogProps.onConfirm as () => Promise<void>}
                onClose={() => setDialogOpen(false)}
            />
        </Box>
    </Modal>
  )
}

export default PetDetails