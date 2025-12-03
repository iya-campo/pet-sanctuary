import React, { useRef, useState } from 'react'
import { CameraAlt, Close } from '@mui/icons-material'
import { Box, Card, CircularProgress, IconButton, Stack, Typography } from '@mui/material'

interface UploadPhotoProps {
  preview?: string;
  onFileChange: (file: File | null) => void;
}

const UploadPhoto = ({ preview, onFileChange }: UploadPhotoProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    onFileChange(file);
    setLoading(false);
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    onFileChange(null);
    setError(null);
  };

  const handleClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <Card 
      variant='outlined' 
      onClick={!loading ? handleClick : undefined}
      sx={{ 
        display: 'flex',
        height: 200, 
        minWidth: 200, 
        cursor: !loading ? 'pointer' : 'default' }}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        multiple={false}
      />
      {loading ? (
          <Box display='flex' width='100%' height='100%' justifyContent='center' alignItems='center'>
            <CircularProgress size={24} />
          </Box>
        ) : preview ? (
          <Box position="relative">
            <Box
              component="img"
              src={preview}
              alt="preview"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
            <IconButton
              size="small"
              onClick={handleRemove}
              sx={{
                position: 'absolute',
                zIndex: 1,
                top: 5,
                right: 5,
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          <Stack 
            alignSelf='center' 
            justifySelf='center'
            alignItems="center" 
            justifyContent='center'
            width='100%'
            spacing={1}>
            <CameraAlt />
            <Box width={150} textAlign="center" sx={{ userSelect: 'none' }}>
              Click to upload image
            </Box>
            {error && <Typography color="error">{error}</Typography>}
          </Stack>
        )
      }
    </Card>
  )
}

export default UploadPhoto
