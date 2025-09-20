import React from 'react'
import { Box, Button, Divider, Modal, Stack, Typography } from '@mui/material';
import { ArrowLeft, ArrowRight, Message } from '@mui/icons-material';
import LabelValue from '@/components/LabelValue';

interface PetDetailsProps {
    data: any;
    open: boolean;
    onClose: () => void;
}

const PetDetails = ({ data, open, onClose }: PetDetailsProps) => {
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
                        <Typography variant='body1'>Our beloved cat, Rusty, has gone missing in the Kensington area of Calgary. Rusty is a ginger tabby with a playful and friendly nature. He has a distinctive white spot on his nose. If found, please approach gently and contact us immediately. We miss him dearly.</Typography>
                    </Box>
                </Stack>
                <Stack spacing={1} flex='1 0 300px'>
                    <Stack pb={2}>
                        <Typography variant='h4'>Details</Typography>
                        <Typography variant='h6'>Lost / Cat Rusty</Typography>
                    </Stack>
                    <LabelValue label='ID' value='241535' />
                    <LabelValue label='Category' value='Cat' />
                    <LabelValue label='Name' value='Rusty' />
                    <LabelValue label='Breed and color' value='Orange tabby' />
                    <LabelValue label='Coat' value='Light with stripes' />
                    <LabelValue label='Height' value='20-25cm' />
                    <LabelValue label='Location' value='Kensington area of Calgary' />
                    <LabelValue label='Date' value='25/11/2023' />
                    <Divider />
                    <LabelValue label='Contact' value='Jordan' />
                    <LabelValue label='Phone number' value='416 *** ** **' />
                    <Typography variant='body1'>We provide free services for publishing announcements about lost and found animals. To see the phone number, you need to register.</Typography>
                    <Stack direction='row' spacing={2} py={4}>
                        <Button variant='outlined' startIcon={<ArrowLeft/>} onClick={onClose}>Back</Button>
                        <Button variant='contained' startIcon={<Message/>} onClick={() => {}}>Send a message</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    </Modal>
  )
}

export default PetDetails