import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands } from "./operations";

const initialState = {
  brands: [],
  isLoading: false,
  error: null,

  selectedBrand: "",
  selectedPrice: "",
  mileageFrom: "",
  mileageTo: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    setSelectedPrice: (state, action) => {
      state.selectedPrice = action.payload;
    },
    setMileageFrom: (state, action) => {
      state.mileageFrom = action.payload;
    },
    setMileageTo: (state, action) => {
      state.mileageTo = action.payload;
    },
    resetFilters: (state) => {
      state.selectedBrand = "";
      state.selectedPrice = "";
      state.mileageFrom = "";
      state.mileageTo = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedBrand,
  setSelectedPrice,
  setMileageFrom,
  setMileageTo,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
