import { NextApiRequest, NextApiResponse } from "next";
import { LOGIN_API, LOGOUT_API, REGISTRATION_API } from "@/constants/apiConstants";
import { mockUsers } from "@/data/mockUsers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      return res.status(200);
      // return res.status(200).json(mockUsers);
    } else if (req.method === 'POST') {
      const { type } = req.query;
      const { email, password } = req.body;

      if (type === 'login') {
        const response = await fetch(LOGIN_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Login failed');
        
        const data = await response.json();

        console.log('Login successful!', data);

        res.setHeader('Set-Cookie', `authToken=${data.token}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600; Path=/`);

        return res.status(200).json({});
      } else if (type === 'logout') {
        const response = await fetch(LOGOUT_API, {
          method: 'POST',
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Logout failed');

        console.log('Logout successful!');

        res.setHeader('Set-Cookie', [
            'authToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/',
            'token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/'
        ]);
        return res.status(200).json({});
      } else if (type === 'registration') {
        const response = await fetch(REGISTRATION_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Registration failed');
        
        const data = await response.json();

        console.log('Registration successful!', data);

        return res.status(201).json(data);
      } else {
        return res.status(405).json({ error: 'Invalid type' });
      }
    }
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error in API:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
