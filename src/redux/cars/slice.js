import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    page: 1,
    total: 0,
    totalPages: 0,
  },
  reducers: {
    resetCars(state) {
      state.list = [];
      state.page = 1;
      state.total = 0;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.page === 1) {
          state.list = action.payload.cars; // Overwrite if it's a new filter
        } else {
          state.list = [...state.list, ...action.payload.cars]; // Append for pagination
        }

        state.page = action.payload.page;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchCars.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { resetCars } = carsSlice.actions;
export default carsSlice.reducer;
