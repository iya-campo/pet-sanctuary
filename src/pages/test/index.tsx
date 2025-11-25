import React, { useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addCat, fetchCats, removeCat, updateCat } from '@/store/slices/cats/slice';
import { generateRandomId } from '@/util/commonUtils';
import { Button, Card, IconButton, Stack, TextField, Typography } from '@mui/material';
import { CatchingPokemon, Check, Delete, Edit } from '@mui/icons-material';

const Test = () => {
  const dispatch = useAppDispatch();
  const { list: cats, loading, error } = useAppSelector((state: RootState) => state.cats);
  
  const [editingItem, setEditingItem] = useState<Cat | null>(null);
  const [newCat, setNewCat] = useState<Cat>({
    id: generateRandomId(),
    name: "",
    desc: "",
  });

  useEffect(() => {
    dispatch(fetchCats());
  }, [dispatch]);

  const handleAddCat = () => {
    if (!newCat.name || !newCat.desc) return;
    dispatch(addCat(newCat));
    setNewCat({
      id: generateRandomId(),
      name: "",
      desc: "",
    })
  };
  
  const handleUpdateCat = (cat: Cat) => {
    dispatch(updateCat({ 
      ...cat, 
      ...editingItem,
      name: cat.name
    }));
    setEditingItem(null);
  };
  
  const handleRemoveCat = (id: string) => {
    dispatch(removeCat(id));
  };

  return (
    <>
      <Typography variant='h5' mt={4} mb={2} fontWeight='bold'>Kitty Redux Exercise</Typography>

      {loading && <Typography variant='body2'>Loading...</Typography>}
      {error && <Typography color='error' variant='body2'>{error}</Typography>}

      <Stack direction='row' mb={2} gap={1}>
        <TextField
          variant='outlined'
          value={newCat.name}
          onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
          placeholder="Ringo"
          size='small'
        />
        <TextField
          variant='outlined'
          value={newCat.desc}
          onChange={(e) => setNewCat({ ...newCat, desc: e.target.value })}
          placeholder="The fluffy cat"
          size='small'
        />
        <Button 
          variant='contained' 
          size='small' 
          onClick={handleAddCat}
        >
            <Typography variant='body1' pr={1}>Add Cat</Typography>
            <CatchingPokemon />
          </Button>
      </Stack>

      <Stack direction='row' gap={2} flexWrap='wrap'>
        {cats.map((cat: Cat) => (
          <Card variant='outlined' sx={{ flexBasis: 'calc(25% - 12px)', p: 2 }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' mb={1}>
              {editingItem?.id !== cat.id ? 
                <Typography variant='h5' my={0.2}>{cat.name}</Typography>
                :
                <TextField 
                  variant='standard' 
                  value={editingItem.name} 
                  onChange={(e) => setEditingItem((prev: Cat | null) => ({ ...prev, name: e.target.value } as Cat))} 
                  sx={{ 
                    '& .MuiInputBase-input': {
                      fontSize: '1.5rem',
                      padding: 0,
                    }
                  }}
                />
              }
              <Stack direction='row' gap={1}>
                {editingItem?.id !== cat.id ? 
                  <IconButton size='small' onClick={() => setEditingItem(cat)}>
                    <Edit />
                  </IconButton>
                  :
                  <IconButton size='small' onClick={() => {
                    setEditingItem(null)
                    handleUpdateCat(editingItem)
                  }}>
                    <Check />
                  </IconButton>
                }
                <IconButton size='small' onClick={() => handleRemoveCat(cat.id)}>
                  <Delete />
                </IconButton>
              </Stack>
            </Stack>
              {editingItem?.id !== cat.id ? 
                <Typography variant='body2' py={0.5}>{cat.desc}</Typography>
                :
                <TextField 
                  variant='standard' 
                  value={editingItem.desc} 
                  onChange={(e) => setEditingItem((prev: Cat | null) => ({ ...prev, desc: e.target.value } as Cat))} 
                  multiline
                  fullWidth
                  sx={{ 
                    '& .MuiInputBase-input': {
                      lineHeight: 1.43,
                      fontSize: '0.875rem',
                      letterSpacing: '0.01071em',
                      padding: 0,
                    }
                  }}
                />
              }
          </Card>
        ))}
      </Stack>
    </>
  )
}

export default Test
