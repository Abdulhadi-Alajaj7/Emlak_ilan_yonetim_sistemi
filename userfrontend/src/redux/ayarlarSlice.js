import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchAyarlar = createAsyncThunk(
  "ayarlar/fetchAyarlar",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/ayarlar");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ayarlar yüklenemedi");
    }
  }
);

const ayarlarSlice = createSlice({
  name: "ayarlar",
  initialState: {
    data: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAyarlar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAyarlar.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAyarlar.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default ayarlarSlice.reducer;
