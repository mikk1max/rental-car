import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
  },
  reducers: {
    resetCars(state) {
      state.list = [];
      state.page = 1;
      state.limit = 8;
      state.total = 0;
      state.totalPages = 0;
    },
    setPage: (state, action) => {
      state.page = action.payload;
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

        // Retrieve the `replace` flag from the thunk's arguments.
        const { replace } = action.meta.arg;
        const { cars, page, total, totalPages } = action.payload;

        // Replace the list if replace is true; otherwise, filter and append.
        if (replace) {
          state.list = cars;
        } else {
          const newCars = cars.filter(
            (newCar) =>
              !state.list.some((existingCar) => existingCar.id === newCar.id)
          );
          state.list = [...state.list, ...newCars];
        }

        state.page = page;
        state.total = total;
        state.totalPages = totalPages;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { resetCars, setPage } = carsSlice.actions;
export default carsSlice.reducer;
