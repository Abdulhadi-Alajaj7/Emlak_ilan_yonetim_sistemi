import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api";

const initialState = {
  admin: null,
  token: "",
  yukleniyor: false,
  hata: "",
};

//---------------------------------------------login
export const girisYap = createAsyncThunk(
  "admin/giris",
  async (veri, thunkAPI) => {
    try {
      const cevap = await api.post(
        "http://localhost:5000/api/admin/login",
        veri,
        { withCredentials: true },
      );
      return cevap.data;
    } catch (hata) {
      return thunkAPI.rejectWithValue(hata.response.data.message);
    }
  },
);

//--------------------------------------------refresh
export const refreshToken = createAsyncThunk(
  "admin/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/refresh", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Refresh token hatası");
    }
  },
);

//---------------------------------------------logut
export const logoutUser = createAsyncThunk(
  "admin/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/logout",
        {},
        { withCredentials: true },
      );
      return null;
    } catch (err) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  },
);

//-------------------------------------------Admin gunceleme
export const updateAdmin = createAsyncThunk(
  "admin/update",
  async (formData, thunkAPI) => {
    try {
      const res = await api.put("/admin/update-me", formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Güncelleme hatası");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cikisYap: (state) => {
      //  httpli olmayan fonksiyonlar
      state.admin = null;
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    // httpli  olan   fonksiyonlar
    builder

      // giriş yükleniyo
      .addCase(girisYap.pending, (state) => {
        state.yukleniyor = true;
      })
      // giriş  başarili
      .addCase(girisYap.fulfilled, (state, action) => {
        state.yukleniyor = false;
        state.admin = action.payload;
        state.token = action.payload.accessToken;
      })
      // giriş hatasi
      .addCase(girisYap.rejected, (state, action) => {
        state.yukleniyor = false;
        state.hata = action.payload;
      })

      // refreş token başarılı
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.token = action.payload.accessToken;
      })

      // logut başarili olursa
      .addCase(logoutUser.fulfilled, (state) => {
        state.admin = null;
        state.token = "";
      })

      // admin yükleniyosa
      .addCase(updateAdmin.pending, (state) => {
        state.yukleniyor = true;
      })

      // admin  güncelme işlemi  dogru
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.yukleniyor = false;
        state.admin = { ...state.admin, ...action.payload };
        state.hata = "";
      })
      // admin guncelme işlemi hatali
      .addCase(updateAdmin.rejected, (state, action) => {
        state.yukleniyor = false;
        state.hata = action.payload;
      });
  },
});

export const { cikisYap } = authSlice.actions;
export default authSlice.reducer;
