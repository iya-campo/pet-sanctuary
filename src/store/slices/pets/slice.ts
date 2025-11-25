import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pet, PetsState } from "@/types/Pet";
import { addPet, deletePet, fetchPets, updatePet } from "./thunks";

const initialState: PetsState = { list: [], loading: false, error: null };

const petSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action: PayloadAction<Pet[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      })

      // POST
      .addCase(addPet.fulfilled, (state, action: PayloadAction<Pet>) => {
        state.list.push(action.payload);
      })

      // PUT
      .addCase(updatePet.fulfilled, (state, action: PayloadAction<Pet>) => {
        const index = state.list.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })

      // DELETE
      .addCase(deletePet.fulfilled, (state, action: PayloadAction<number>) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
      });
  },
});

export default petSlice.reducer;