export type PetStatus = 'Lost' | 'Found' | 'For Adoption';

export type PetSpecies = 'dog' | 'cat' | 'bird';

export interface Pet {
    id: number;
    name: string;
    species: PetSpecies;
    breed: string;
    coat: string;
    height?: string;
    location: string;
    date: string;
    contact: string;
    mobile: string;
    desc?: string;
    status: PetStatus;
    imgUrl?: string;
}