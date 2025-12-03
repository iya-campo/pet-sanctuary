import { NextApiRequest, NextApiResponse } from "next";
import { PetSpecies, PetStatus } from "@/types/Pet";
import { PETS_API } from "@/constants/apiConstants";
import { validateRequiredFields } from "@/util/commonUtils";
import { mockPets } from "@/data/mockPets";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
        const { type, species, location, limit = 9, page = 1, sortBy = 'createdAt', sortOrder = 'asc' } = req.query;

        const filters: { type?: PetStatus; species?: PetSpecies; location?: string } = {
          type: type ? (type as PetStatus) : undefined,
          species: species ? (species as PetSpecies) : undefined,
          location: location ? (location as string) : undefined,
        };

        const queryParams = new URLSearchParams();
        if (filters.type) queryParams.append('type', filters.type);
        if (filters.species) queryParams.append('species', filters.species);
        if (filters.location) queryParams.append('location', filters.location);
        queryParams.append('limit', limit?.toString());
        queryParams.append('page', page.toString());
        queryParams.append('sortBy', sortBy.toString());
        queryParams.append('sortOrder', sortOrder.toString());

        const queryString = queryParams.toString();
        const url = queryString ? `${PETS_API}?${queryString}` : PETS_API;

        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch pets');
        }

        const data = await response.json();

        return res.status(200).json(data);
        // return res.status(200).json(mockPets);
    } else if (req.method === 'POST') {
        const { 
            type, 
            name, 
            age, 
            gender, 
            species, 
            breed, 
            location, 
            desc,
            imageUrls,
            userId
        } = req.body;
        const missingFields = validateRequiredFields(req.body, ['name', 'age', 'breed', 'location']);
        if (missingFields) {
          return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }

        const newPet = {
            type,
            name,
            age: parseInt(age),
            gender,
            species,
            breed,
            location,
            desc,
            imageUrls,
            userId,
        };

        return res.status(201).json(newPet);
    }
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error in API:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
