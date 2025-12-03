import { User } from "./User";

export type PetStatus = 'LOST' | 'FOUND' | 'FOR ADOPTION' | 'ADOPTED' | 'CLOSED';

export type PetSpecies = 'DOG' | 'CAT' | 'BIRD';

export type Gender = 'MALE' | 'FEMALE';

export interface Pet {
    id: number;
    createdAt: Date;
    name: string;
    species: PetSpecies;
    breed: string;
    coat: string;
    age?: number;
    gender: Gender;
    location: string;
    desc?: string;
    type: PetStatus;
    imageUrls: string;
    user: User;
    userId: number;
    adopter?: User | null;
    adopterId?: number | null;
}

export interface PetsState {
  list: Pet[];
  loading: boolean;
  error: string | null;
}