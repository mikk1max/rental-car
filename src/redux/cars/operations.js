import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCars } from "../../service/api";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (args, thunkAPI) => {
    try {
      const data = await getAllCars(args);
      // console.log(args);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
