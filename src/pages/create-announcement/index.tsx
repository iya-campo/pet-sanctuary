import React, { ReactNode, useState } from 'react'
import Layout from '@/components/Layout';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import UploadPhoto from './components/UploadPhoto';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Gender, Pet, PetSpecies, PetStatus } from '@/types/Pet';
import { useAuth } from '@/hooks/useAuth';
import { GENDER, PET_SPECIE, PET_STATUS } from '@/constants/petConstants';

type FormData = {
    type: PetStatus;
    name: string;
    age: number;
    gender: Gender;
    species: PetSpecies;
    breed: string;
    location: string;
    desc: string;
    imgUrl: string;
    userId: number;
}

const CreateAnnouncementPage = () => {
    const { user } = useAuth();
    const [files, setFiles] = useState<File[]>(['', '', '', '', ''] as unknown as File[]);

    const handleCreatePet = async (newPet: Pet) => {
      await fetch('api/pets', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(newPet) 
      });
    };

    const formik = useFormik<FormData>({
        initialValues: {
            type: PET_STATUS.LOST as PetStatus,
            name: 'Max',
            age: 4,
            gender: GENDER.MALE as Gender,
            species: PET_SPECIE.DOG as PetSpecies,
            breed: 'Siberian Husky',
            // coat: 'Solid black',
            location: 'Texas',
            desc: 'He a gud boi fr',
            imgUrl: '',
            userId: user?.id || 0,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            age: Yup.string().required('Age is required'),
            breed: Yup.string().required('Breed is required'),
            // coat: Yup.string().required('Coat is required'),
            location: Yup.string().required('Location is required'),
        }),
        onSubmit: (values) => {
            console.log('Form data submitted:', values);
            handleCreatePet({
                name: values.name,
                species: values.species,
                breed: values.breed,
                age: values.age,
                gender: values.gender,
                location: values.location,
                desc: values.desc,
                type: values.type,
                imgUrl: values.imgUrl,
                userId: values.userId,
            } as Pet)
        },
    });
    
    return (
        <>
            <Stack spacing={1} my={4}>
                <Typography variant='h5'>New Post</Typography>
                <Typography variant='subtitle1'>Fill out the form to publish an announcement.</Typography>
            </Stack>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={4}>
                    <Stack direction='row' justifyContent='space-between' spacing={8}>
                        <Stack flex={1} spacing={2}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Creating an advertisement</FormLabel>
                                <RadioGroup
                                    row
                                    name="type"
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                >
                                    <FormControlLabel value={PET_STATUS.LOST} control={<Radio />} label="Lost" />
                                    <FormControlLabel value={PET_STATUS.FOUND} control={<Radio />} label="Found" />
                                    <FormControlLabel value={PET_STATUS.FOR_ADOPTION} control={<Radio />} label="For Adoption" />
                                </RadioGroup>
                            </FormControl>
                            <Box>
                                <FormControl fullWidth margin="normal" variant="outlined">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <FormLabel sx={{ minWidth: 80 }}>Name</FormLabel>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Enter name"
                                            size="small"
                                            fullWidth
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                        />
                                    </Stack>
                                </FormControl>
                                <FormControl fullWidth margin="normal" variant="outlined">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <FormLabel sx={{ minWidth: 80 }}>Age</FormLabel>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Enter age"
                                            size="small"
                                            fullWidth
                                            name="age"
                                            value={formik.values.age}
                                            onChange={formik.handleChange}
                                            error={formik.touched.age && Boolean(formik.errors.age)}
                                            helperText={formik.touched.age && formik.errors.age}
                                        />
                                    </Stack>
                                </FormControl>
                                <FormControl margin="normal" component="fieldset">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <FormLabel sx={{ minWidth: 80 }}>Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            name="gender"
                                            value={formik.values.gender}
                                            onChange={formik.handleChange}
                                            sx={{ display: 'inline-block' }}
                                        >
                                            <FormControlLabel value={GENDER.MALE} control={<Radio />} label="Male" />
                                            <FormControlLabel value={GENDER.FEMALE} control={<Radio />} label="Female" />
                                        </RadioGroup>
                                    </Stack>
                                </FormControl>
                            </Box>
                        </Stack>
                        <Stack flex={1} spacing={2}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Choose category</FormLabel>
                                <RadioGroup
                                    row
                                    name="species"
                                    value={formik.values.species}
                                    onChange={formik.handleChange}
                                >
                                    <FormControlLabel value={PET_SPECIE.DOG} control={<Radio />} label="Dog" />
                                    <FormControlLabel value={PET_SPECIE.CAT} control={<Radio />} label="Cat" />
                                    <FormControlLabel value={PET_SPECIE.BIRD} control={<Radio />} label="Bird" />
                                    <FormControlLabel value="others" control={<Radio />} label="Others" />
                                </RadioGroup>
                            </FormControl>
                            <Box>
                                <FormControl fullWidth margin="normal" variant="outlined">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <FormLabel sx={{ minWidth: 80 }}>Breed</FormLabel>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Enter breed"
                                            size="small"
                                            fullWidth
                                            name="breed"
                                            value={formik.values.breed}
                                            onChange={formik.handleChange}
                                            error={formik.touched.breed && Boolean(formik.errors.breed)}
                                            helperText={formik.touched.breed && formik.errors.breed}
                                        />
                                    </Stack>
                                </FormControl>
                                <FormControl fullWidth margin="normal" variant="outlined">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <FormLabel sx={{ minWidth: 80 }}>Coat</FormLabel>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Enter coat"
                                            size="small"
                                            fullWidth
                                            name="coat"
                                            // value={formik.values.coat}
                                            // onChange={formik.handleChange}
                                            // error={formik.touched.coat && Boolean(formik.errors.coat)}
                                            // helperText={formik.touched.coat && formik.errors.coat}
                                        />
                                    </Stack>
                                </FormControl>
                                <FormControl fullWidth margin="normal" variant="outlined">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <FormLabel sx={{ minWidth: 80 }}>Location</FormLabel>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Enter location"
                                            size="small"
                                            fullWidth
                                            name="location"
                                            value={formik.values.location}
                                            onChange={formik.handleChange}
                                            error={formik.touched.location && Boolean(formik.errors.location)}
                                            helperText={formik.touched.location && formik.errors.location}
                                        />
                                    </Stack>
                                </FormControl>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack direction='row'>
                        <IconButton color="primary" component="span">
                            <ArrowLeft sx={{ fontSize: 50 }} />
                        </IconButton>
                        <Stack direction='row' spacing={2} flex={1} justifyContent='space-around'>
                            {files.map((file: File, index: number) => {
                                return (file === '' as unknown as File) ? 
                                <UploadPhoto key={index} /> : <></>
                            })}
                        </Stack>
                        <IconButton color="primary" component="span">
                            <ArrowRight sx={{ fontSize: 50 }} />
                        </IconButton>
                    </Stack>
                    <Stack>
                        <Typography variant="subtitle1">Please write a short description:</Typography>
                        <TextField
                            variant="outlined"
                            multiline
                            rows={4}
                            placeholder="Enter your description"
                            fullWidth
                            name="desc"
                            value={formik.values.desc}
                            onChange={formik.handleChange}
                            error={formik.touched.desc && Boolean(formik.errors.desc)}
                            helperText={formik.touched.desc && formik.errors.desc}
                        />
                    </Stack>
                    <Button type="submit" variant='contained' size='large' sx={{ width: 'fit-content', alignSelf: 'flex-end' }}>Create Announcement</Button>
                </Stack>
            </form>
        </>
    )
}

CreateAnnouncementPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};

export default CreateAnnouncementPage;
