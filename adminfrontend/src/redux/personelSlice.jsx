import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// 1. جلب كل الموظفين
export const getPersonel = createAsyncThunk("personel/getAll", async (_, thunkAPI) => {
    try {
        const res = await api.get("/ekip");
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Personel listesi yüklenemedi");
    }
});

// 2. جلب موظف واحد (للتعديل)
export const getSinglePersonel = createAsyncThunk("personel/getSingle", async (id, thunkAPI) => {
    try {
        const res = await api.get(`/ekip/${id}`);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Personel bilgileri alınamadı");
    }
});

// 3. إضافة موظف جديد
export const addPersonel = createAsyncThunk("personel/add", async (formData, thunkAPI) => {
    try {
        // نرسل الـ formData مباشرة لأنها تحتوي على صورة
        const res = await api.post("/ekip", formData);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Personel eklenemedi");
    }
});

// 4. تعديل بيانات موظف
export const updatePersonel = createAsyncThunk("personel/update", async ({ id, data }, thunkAPI) => {
    try {
        const res = await api.put(`/ekip/${id}`, data);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Personel güncellenemedi");
    }
});

// 5. حذف موظف
export const deletePersonel = createAsyncThunk("personel/delete", async (id, thunkAPI) => {
    try {
        await api.delete(`/ekip/${id}`);
        return id; // نرجع الـ id عشان نحذفه من الـ state
    } catch (err) {
        return thunkAPI.rejectWithValue("Personel silinemedi");
    }
});

const personelSlice = createSlice({
    name: "personel",
    initialState: {
        ekip: [],
        seciliPersonel: null, // للموظف اللي بنعدله
        yukleniyor: false,
        hata: null,
    },
    reducers: {
        resetSeciliPersonel: (state) => {
            state.seciliPersonel = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // جلب الكل
            .addCase(getPersonel.pending, (state) => { state.yukleniyor = true; })
            .addCase(getPersonel.fulfilled, (state, action) => {
                state.yukleniyor = false;
                state.ekip = action.payload;
            })
            .addCase(getPersonel.rejected, (state, action) => {
                state.yukleniyor = false;
                state.hata = action.payload;
            })

            // جلب موظف واحد
            .addCase(getSinglePersonel.fulfilled, (state, action) => {
                state.seciliPersonel = action.payload;
            })

            // إضافة موظف
            .addCase(addPersonel.fulfilled, (state, action) => {
                state.ekip.push(action.payload);
            })

            // تعديل موظف
            .addCase(updatePersonel.fulfilled, (state, action) => {
                const index = state.ekip.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.ekip[index] = action.payload;
                }
                state.seciliPersonel = action.payload;
            })

            // حذف موظف
            .addCase(deletePersonel.fulfilled, (state, action) => {
                state.ekip = state.ekip.filter(p => p._id !== action.payload);
            });
    }
});

export const { resetSeciliPersonel } = personelSlice.actions;
export default personelSlice.reducer;