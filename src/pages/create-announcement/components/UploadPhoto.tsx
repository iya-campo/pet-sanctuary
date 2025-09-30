import { CameraAlt } from '@mui/icons-material'
import { Box, Card, Stack } from '@mui/material'
import React from 'react'

const UploadPhoto = () => {
  return (
    <Card variant='outlined' sx={{ minWidth: 200, px: 2, py: 4 }}>
        <Stack alignItems='center' spacing={1}>
            <CameraAlt />
            <Box width={150} textAlign='center'>Drag and drop or browse files</Box>
        </Stack>
    </Card>
  )
}

export default UploadPhoto
