import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// 1. إضافة إعلان جديد
export const addIlan = createAsyncThunk(
  "ilan/add",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/ilan", formData);
      return res.data.ilan; // نرجع الإعلان اللي انضاف
    } catch (err) {
      return thunkAPI.rejectWithValue("İlan eklenemedi");
    }
  },
);

// 2. جلب جميع الإعلانات
export const getIlanlar = createAsyncThunk(
  "ilan/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/ilan");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("İlanlar yüklenemedi");
    }
  },
);

// 3. جلب إعلان واحد (للتعديل أو التفاصيل)
export const getSingleIlan = createAsyncThunk(
  "ilan/getSingle",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/ilan/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("İlan detayları alınamadı");
    }
  },
);

// 4. تحديث إعلان
export const updateIlan = createAsyncThunk(
  "ilan/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/ilan/${id}`, data);
      return res.data; // نرجع res.data مباشرة لأن الباكيند يرسل الكائن فوراً
    } catch (err) {
      return thunkAPI.rejectWithValue("İlan güncellenemedi");
    }
  },
);

// 5. حذف إعلان
export const deleteIlan = createAsyncThunk(
  "ilan/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/ilan/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue("İlan silinemedi");
    }
  },
);

const ilanSlice = createSlice({
  name: "ilan",
  initialState: {
    ilanlar: [],
    seciliIlan: null, // للإعلان اللي بنفتحه عشان نعدله
    yukleniyor: false,
    hata: null,
  },
  reducers: {
    resetSeciliIlan: (state) => {
      state.seciliIlan = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Get All Ilanlar ---
      .addCase(getIlanlar.pending, (state) => {
        state.yukleniyor = true;
      })
      .addCase(getIlanlar.fulfilled, (state, action) => {
        state.yukleniyor = false;
        state.ilanlar = action.payload;
      })
      .addCase(getIlanlar.rejected, (state, action) => {
        state.yukleniyor = false;
        state.hata = action.payload;
      })

      // --- Add Ilan ---
      .addCase(addIlan.fulfilled, (state, action) => {
        state.ilanlar.push(action.payload); // نضيف الجديد للقائمة فوراً
      })

      // --- Get Single Ilan ---
      .addCase(getSingleIlan.fulfilled, (state, action) => {
        state.seciliIlan = action.payload;
      })

      // --- Update Ilan ---
      .addCase(updateIlan.fulfilled, (state, action) => {
        state.yukleniyor = false;
        // حماية للتأكد من وجود البيانات
        if (action.payload && action.payload._id) {
          const index = state.ilanlar.findIndex(
            (i) => i._id === action.payload._id,
          );
          if (index !== -1) {
            state.ilanlar[index] = action.payload;
          }
          state.seciliIlan = action.payload;
        }
      })

      // --- Delete Ilan ---
      .addCase(deleteIlan.fulfilled, (state, action) => {
        state.ilanlar = state.ilanlar.filter(
          (ilan) => ilan._id !== action.payload,
        );
      });
  },
});

export const { resetSeciliIlan } = ilanSlice.actions;
export default ilanSlice.reducer;
