import { Pet } from "./Pet";

export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  location: string;
  bio?: string;
  imgUrl?: string;
  pets: Pet[];
  adoptedPets: Pet[];
}