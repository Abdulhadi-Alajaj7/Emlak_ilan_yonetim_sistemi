import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Tüm mesajları çek
export const getMesajlar = createAsyncThunk("mesaj/getAll", async (_, thunkAPI) => {
    try {
        const res = await api.get("/mesaj");
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Mesajlar yüklenemedi");
    }
});

// Tek bir mesaj detayını getir
export const getSingleMesaj = createAsyncThunk("mesaj/getSingle", async (id, thunkAPI) => {
    try {
        const res = await api.get(`/mesaj/${id}`);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Mesaj detayı alınamadı");
    }
});

// Mesajı sil
export const deleteMesaj = createAsyncThunk("mesaj/delete", async (id, thunkAPI) => {
    try {
        await api.delete(`/mesaj/${id}`);
        return id;
    } catch (err) {
        return thunkAPI.rejectWithValue("Mesaj silinemedi");
    }
});

const mesajSlice = createSlice({
    name: "mesaj",
    initialState: {
        mesajlar: [],
        seciliMesaj: null,
        yukleniyor: false,
    },
    reducers: {
        resetSeciliMesaj: (state) => {
            state.seciliMesaj = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMesajlar.pending, (state) => { state.yukleniyor = true; })
            .addCase(getMesajlar.fulfilled, (state, action) => {
                state.yukleniyor = false;
                state.mesajlar = action.payload;
            })
            .addCase(getSingleMesaj.fulfilled, (state, action) => {
                state.seciliMesaj = action.payload;
            })
            .addCase(deleteMesaj.fulfilled, (state, action) => {
                state.mesajlar = state.mesajlar.filter(m => m._id !== action.payload);
            });
    }
});

export const { resetSeciliMesaj } = mesajSlice.actions;
export default mesajSlice.reducer;