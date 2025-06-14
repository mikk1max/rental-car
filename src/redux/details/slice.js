import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCarById } from "../../service/api";

export const fetchCarDetails = createAsyncThunk(
  "carDetails/fetchCarDetails",
  async (id) => {
    const data = await getCarById(id);
    return data;
  }
);

const carDetailsSlice = createSlice({
  name: "carDetails",
  initialState: {
    car: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCarDetails(state) {
      state.car = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.car = action.payload;
      })
      .addCase(fetchCarDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCarDetails } = carDetailsSlice.actions;
export default carDetailsSlice.reducer;
