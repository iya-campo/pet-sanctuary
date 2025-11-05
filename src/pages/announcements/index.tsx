import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { SelectChangeEvent, Stack, Typography } from '@mui/material';
import Layout from '@/components/Layout';
import Filter from './components/Filter';
import Announcements from './components/Announcements';
import { Pet, PetSpecies, PetStatus } from '@/types/Pet';
import { LOADING_STATUS } from '@/constants/loadingConstants';
import { LoadingStatus } from '@/types/Loading';
import { useRouter } from 'next/router';

const LIMIT = 9;

const AnnouncementsPage = () => {
  const router = useRouter();
  const { query } = router;

  const limitFromQuery = query.limit || LIMIT;
  const pageFromQuery = query.page || 1;
  const sortByFromQuery = query.sortBy || 'createdAt';
  const sortOrderFromQuery = query.sortOrder || 'asc';
  const typeFromQuery = query.type || '';
  const speciesFromQuery = query.species || '';

  const [ pets, setPets ] = useState<Pet[]>([]);
  const [ totalCount, setTotalCount ] = useState<number>(0);

  const [ page, setPage ] = useState<number>(pageFromQuery as number);
  const [ sortBy, setSortBy ] = useState<string>(sortByFromQuery as string);
  const [ sortOrder, setSortOrder ] = useState<string>(sortOrderFromQuery as string);
  const [ status, setStatus ] = useState<PetStatus>(typeFromQuery as PetStatus);
  const [ species, setSpecies ] = useState<PetSpecies>(speciesFromQuery as PetSpecies);
  
  const [ loading, setLoading ] = useState<LoadingStatus>(LOADING_STATUS.IDLE);

  useEffect(() => {
    setPage(parseInt(pageFromQuery.toString()));
    setSortBy(sortByFromQuery as string);
    setSortOrder(sortOrderFromQuery as string);
    setStatus(typeFromQuery as PetStatus);
    setSpecies(speciesFromQuery as PetSpecies);

    fetchPets();
  }, [router.query]);

  const fetchPets = async () => {
    setLoading(LOADING_STATUS.PENDING);
    
    try {
      const url = new URL('api/pets', window.location.origin);
      const searchParams = new URLSearchParams();

      if (speciesFromQuery) searchParams.append('species', speciesFromQuery.toString());
      if (typeFromQuery) searchParams.append('type', typeFromQuery.toString());
      searchParams.append('page', pageFromQuery.toString());
      searchParams.append('limit', limitFromQuery.toString());
      searchParams.append('sortBy', sortByFromQuery.toString());
      searchParams.append('sortOrder', sortOrderFromQuery.toString());

      url.search = searchParams.toString();
      
      const response = await fetch(url, { method: 'GET' });
      const { pets, totalCount } = await response.json();
      
      setPets(pets || []);
      setTotalCount(totalCount);

      setLoading(LOADING_STATUS.SUCCESS);
    } catch (error) {
      setLoading(LOADING_STATUS.ERROR);
      console.error('Fetch pets failed:', error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    }, undefined, { shallow: true });
  };

  const handleSortChange = (newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sortBy: newSortBy, sortOrder: newSortOrder, page: 1 },
    }, undefined, { shallow: true });
  };

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as PetStatus);
    router.push({
        pathname: router.pathname,
        query: { ...router.query, type: event.target.value },
    }, undefined, { shallow: true });
  }

  const handleSpeciesChange = (event: SelectChangeEvent<PetSpecies>) => {
    setSpecies(event.target.value as PetSpecies);
    router.push({
        pathname: router.pathname,
        query: { ...router.query, species: event.target.value },
    }, undefined, { shallow: true });
  }

  const handleClearFilters = () => {
    setStatus("" as PetStatus);
    setSpecies("" as PetSpecies);
    router.push('/announcements');
  }

  const handleUpdate = () => fetchPets();

  return (
    <Stack spacing={4}>
      <Typography variant='h4'>Recents Announcements</Typography>
      <Filter 
        status={status} 
        species={species}
        handleStatusChange={handleStatusChange}
        handleSpeciesChange={handleSpeciesChange}
        handleClearFilters={handleClearFilters}
      />
      {/* Items per page (limit) */}
      {/* <select onChange={(e) => handleLimitChange(Number(e.target.value))} value={limit}>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
        <option value={50}>50 per page</option>
      </select> */}
      <Announcements 
        pets={pets} 
        totalCount={totalCount} 
        limit={LIMIT}
        page={page}
        sortBy={sortBy}
        sortOrder={sortOrder}
        loading={loading} 
        handlePageChange={handlePageChange}
        handleSortChange={handleSortChange}
        onUpdate={handleUpdate}
      />
    </Stack>
  );
};

AnnouncementsPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};

export default AnnouncementsPage;
