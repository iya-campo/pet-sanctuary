import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pet } from "@/types/Pet";

// GET all pets
export const fetchPets = createAsyncThunk<Pet[]>(
  "pets/fetchPets",
  async () => {
    const res = await fetch("/api/pets");
    if (!res.ok) throw new Error("Failed to fetch pets");
    return (await res.json()) as Pet[];
  }
);

// POST new pet
export const addPet = createAsyncThunk<Pet, Omit<Partial<Pet>, "id">>(
  "pets/addPet",
  async (newPet) => {
    const res = await fetch("/api/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPet),
    });
    if (!res.ok) throw new Error("Failed to add pet");
    return (await res.json()) as Pet;
  }
);

// PUT update pet
export const updatePet = createAsyncThunk<
  Pet,
  { id: number; updates: Partial<Pet> }
>("pets/updatePet", async ({ id, updates }) => {
  const res = await fetch(`/api/pets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update pet");
  return (await res.json()) as Pet;
});

// DELETE pet
export const deletePet = createAsyncThunk<number, number>(
  "pets/deletePet",
  async (id) => {
    const res = await fetch(`/api/pets/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to remove pet");
    return id;
  }
);