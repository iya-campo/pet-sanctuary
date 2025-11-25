import { mockCats } from "@/data/mockCats";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
        // const response = await fetch(PETS_API, { method: 'GET' });

        // if (!response.ok) {
        //   const errorData = await response.json();
        //   throw new Error(errorData.message || 'Failed to fetch pets');
        // }

        // const data = await response.json();

        // return res.status(200).json(data);
        return res.status(200).json(mockCats);
    }
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error in API:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
