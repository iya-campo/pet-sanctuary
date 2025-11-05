import { NextApiRequest, NextApiResponse } from "next";
import { PETS_API } from "@/constants/apiConstants";
import { mockPets } from "@/data/mockPets";
import { validateRequiredFields } from "@/util/commonUtils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  try {
    if (req.method === 'GET') {
        const response = await fetch(`${PETS_API}/${id}`, { method: 'GET' });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch pets');
        }

        const data = await response.json();

        return res.status(200).json(data);
    } else if (req.method === 'PUT') {
        const { 
            type, 
            name, 
            age, 
            gender, 
            species, 
            breed, 
            location, 
            desc,
        } = req.body;
                
        const missingFields = validateRequiredFields(req.body, ['name', 'age', 'breed', 'location']);
        if (missingFields) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }

        const updatedPet = {
            type,
            name,
            age: parseInt(age),
            gender,
            species,
            breed,
            location,
            desc,
        };

        const response = await fetch(`${PETS_API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPet),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update pet');
        }
        
        const data = await response.json();

        return res.status(200).json(data);
        // return res.status(200).json(mockPets);
    } else if (req.method === 'DELETE') {
        const response = await fetch(`${PETS_API}/${id}`, { method: 'DELETE' });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete pet');
        }

        return res.status(200).json(response);
    } else return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error in API:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
