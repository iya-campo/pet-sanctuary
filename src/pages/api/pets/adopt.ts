import { NextApiRequest, NextApiResponse } from "next";
import { PETS_API } from "@/constants/apiConstants";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
        const { 
            petId,
            adopterId,
        } = req.body;

        const adoptedPet = {
            petId,
            adopterId,
        };

        const response = await fetch(`${PETS_API}/adopt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adoptedPet),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to adopt pet');
        }
        
        const data = await response.json();

        return res.status(200).json(data);
        // return res.status(200).json(mockPets);
    } else return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error in API:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
