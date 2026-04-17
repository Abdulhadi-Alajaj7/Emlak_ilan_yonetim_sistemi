import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const getAyarlar = createAsyncThunk("ayarlar/get", async () => {
  const res = await api.get("/ayarlar");
  return res.data;
});

export const updateAyarlar = createAsyncThunk("ayarlar/update", async (formData) => {
  // هنا نرسل الـ formData كما هي (Axios سيتكفل بالباقي)
  const res = await api.put("/ayarlar", formData);
  return res.data;
});

const ayarlarSlice = createSlice({
  name: "ayarlar",
  initialState: {
    data: null,
    yukleniyor: false,
    hata: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAyarlar.pending, (state) => { state.yukleniyor = true; })
      .addCase(getAyarlar.fulfilled, (state, action) => {
        state.yukleniyor = false;
        state.data = action.payload;
      })
      .addCase(updateAyarlar.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default ayarlarSlice.reducer;