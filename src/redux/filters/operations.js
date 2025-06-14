import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBrands } from "../../service/api";

export const fetchBrands = createAsyncThunk("filters/fetchBrands", async () => {
  const data = await getAllBrands();
  return ["Any", ...data];
});
