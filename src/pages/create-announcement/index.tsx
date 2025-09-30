import React, { ReactNode } from 'react'
import Layout from '@/components/Layout';
import { Box, Button, Container, IconButton, Stack, TextField, Typography } from '@mui/material';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import UploadPhoto from './components/UploadPhoto';

const CreateAnnouncementPage = () => {
    const [files, setFiles] = React.useState<File[]>(['', '', '', '', ''] as unknown as File[]);
    
    return (
        <Container>
            <Stack spacing={1} my={4}>
                <Typography variant='h5'>New Post</Typography>
                <Typography variant='subtitle1'>Fill out the form to publish an announcement.</Typography>
            </Stack>
            <Stack spacing={4}>
                <Stack direction='row' justifyContent='space-between' spacing={8}>
                    <Stack flex={1} spacing={2}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Creating an advertisement</FormLabel>
                            <RadioGroup row name="announcementType" defaultValue="lost">
                                <FormControlLabel value="lost" control={<Radio />} label="Lost" />
                                <FormControlLabel value="found" control={<Radio />} label="Found" />
                                <FormControlLabel value="adoption" control={<Radio />} label="For Adoption" />
                            </RadioGroup>
                        </FormControl>
                        <Box>
                            <FormControl fullWidth margin="normal" variant="outlined">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <FormLabel sx={{ minWidth: 80 }}>Name</FormLabel>
                                    <TextField
                                        variant="outlined"
                                        placeholder="Enter name"
                                        size='small'
                                        fullWidth
                                    />
                                </Stack>
                            </FormControl>
                            <FormControl fullWidth margin="normal" variant="outlined">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <FormLabel sx={{ minWidth: 80 }}>Coat</FormLabel>
                                    <TextField
                                        variant="outlined"
                                        placeholder="Enter coat"
                                        size='small'
                                        fullWidth
                                    />
                                </Stack>
                            </FormControl>
                            <FormControl fullWidth margin="normal" variant="outlined">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <FormLabel sx={{ minWidth: 80 }}>Height</FormLabel>
                                    <TextField
                                        variant="outlined"
                                        placeholder="Enter height"
                                        size='small'
                                        fullWidth
                                    />
                                </Stack>
                            </FormControl>
                        </Box>
                    </Stack>
                    <Stack flex={1} spacing={2}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Choose category</FormLabel>
                            <RadioGroup row name="categoryType" defaultValue="dog">
                                <FormControlLabel value="dog" control={<Radio />} label="Dog" />
                                <FormControlLabel value="cat" control={<Radio />} label="Cat" />
                                <FormControlLabel value="bird" control={<Radio />} label="Bird" />
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
                                        size='small'
                                        fullWidth
                                    />
                                </Stack>
                            </FormControl>
                            <FormControl fullWidth margin="normal" variant="outlined">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <FormLabel sx={{ minWidth: 80 }}>Date</FormLabel>
                                    <TextField
                                        variant="outlined"
                                        placeholder="Enter date"
                                        size='small'
                                        fullWidth
                                    />
                                </Stack>
                            </FormControl>
                            <FormControl fullWidth margin="normal" variant="outlined">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <FormLabel sx={{ minWidth: 80 }}>Location</FormLabel>
                                    <TextField
                                        variant="outlined"
                                        placeholder="Enter location"
                                        size='small'
                                        fullWidth
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
                    <Typography variant="subtitle1">Please write a comment:</Typography>
                    <TextField
                        variant="outlined"
                        multiline
                        rows={4}
                        placeholder="Enter your comment"
                        fullWidth
                    />
                </Stack>
                <Button variant='contained' size='large' sx={{ width: 'fit-content', alignSelf: 'flex-end' }}>Create Announcement</Button>
            </Stack>
        </Container>
    )
}

CreateAnnouncementPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};

export default CreateAnnouncementPage;
