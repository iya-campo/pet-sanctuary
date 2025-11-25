import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Async thunk to fetch items from an API (simulated here)
export const fetchCats = createAsyncThunk<Cat[]>(
  'cats/fetchCats',
  async () => {
    const response = await fetch('/pet-sanctuary/api/cats'); // Example API endpoint
    if (!response.ok) throw new Error('Failed to fetch cats');
    return response.json();
  }
);

const initialState: CatState = { list: [], loading: false, error: null };

const catSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    addCat: (state, action: PayloadAction<Cat>) => {
      state.list.push(action.payload);
    },
    updateCat: (state, action: PayloadAction<Cat>) => {
      const index = state.list.findIndex(item => item.id === action.payload.id);
      if (index >= 0) state.list[index] = action.payload;
    },
    removeCat: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCats.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch items';
        state.loading = false;
      });
  },
});

export const { addCat, updateCat, removeCat } = catSlice.actions;

export default catSlice.reducer;