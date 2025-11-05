import { NextApiRequest, NextApiResponse } from "next";
import { USERS_API } from "@/constants/apiConstants";
import { mockUsers } from "@/data/mockUsers";

export const getUserByEmail = async (email: string, token: string) => {
  try {
    const response = await fetch(`${USERS_API}/${email}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) throw new Error('Authentication required');

    const data = await response.json();
    console.log('User data fetched successfully!', data);
    
    return data;
    // return mockUsers;
  } catch (error) {
    console.error('Error in API:', error);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { email } = req.query;
      const token = req.cookies.authToken || '';

      const userData = await getUserByEmail(email as string, token as string);
      
      return res.status(200).json(userData);
      // return res.status(200).json(mockUsers);
    }
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error in API:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
