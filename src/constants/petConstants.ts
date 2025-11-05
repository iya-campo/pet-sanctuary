import { Gender, PetSpecies, PetStatus } from "@/types/Pet";

export const PET_STATUS = {
  FOUND: 'FOUND' as PetStatus,
  LOST: 'LOST' as PetStatus,
  FOR_ADOPTION: 'FOR_ADOPTION' as PetStatus,
  ADOPTED: 'ADOPTED' as PetStatus,
  CLOSED: 'CLOSED' as PetStatus,
};

export const PET_SPECIE = {
  DOG: 'DOG' as PetSpecies,
  CAT: 'CAT' as PetSpecies,
  BIRD: 'BIRD' as PetSpecies,
  OTHERS: 'OTHERS' as PetSpecies,
};

export const GENDER = {
  MALE: 'MALE' as Gender,
  FEMALE: 'FEMALE' as Gender,
};