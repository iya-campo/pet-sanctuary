
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pet-sanctuary-api.vercel.app';

// Internal API Endpoints (server-side API routes)
export const LOGIN_API = `${BASE_URL}/auth/login`;
export const LOGOUT_API = `${BASE_URL}/auth/logout`;
export const REGISTRATION_API = `${BASE_URL}/auth/register`;
export const USERS_API = `${BASE_URL}/users`;
export const PETS_API = `${BASE_URL}/pets`;