import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Tüm ilanları backend'den çeken thunk (Backend frozen, pagination yok)
export const fetchIlanlar = createAsyncThunk(
  "ilan/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/ilan");
      return response.data; // Array of ilanlar
    } catch (error) {
      return thunkAPI.rejectWithValue("İlanlar yüklenirken bir hata oluştu");
    }
  }
);

const ilanSlice = createSlice({
  name: "ilan",
  initialState: {
    items: [], // Orijinal veri seti (değiştirilmez)
    filteredItems: [], // UI'da gösterilecek (filtrelenmiş) veri seti
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    // Aktif filtreler
    filters: {
      searchTerm: "",
      minPrice: "",
      maxPrice: "",
      ilanTuru: "", // Satılık, Kiralık
      sehir: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      
      // Filtreleme mantığı
      let result = [...state.items];

      if (state.filters.searchTerm) {
        const searchLower = state.filters.searchTerm.toLowerCase();
        result = result.filter(
          (ilan) =>
            ilan.baslik.toLowerCase().includes(searchLower) ||
            ilan.aciklama.toLowerCase().includes(searchLower)
        );
      }
      
      if (state.filters.minPrice) {
        result = result.filter((ilan) => ilan.fiyat >= Number(state.filters.minPrice));
      }

      if (state.filters.maxPrice) {
        result = result.filter((ilan) => ilan.fiyat <= Number(state.filters.maxPrice));
      }

      if (state.filters.ilanTuru) {
        const turLower = state.filters.ilanTuru.toLowerCase();
        result = result.filter((ilan) => ilan.ilanTuru && ilan.ilanTuru.toLowerCase() === turLower);
      }

      if (state.filters.sehir) {
        const sehirLower = state.filters.sehir.toLowerCase();
        result = result.filter((ilan) => ilan.sehir.toLowerCase().includes(sehirLower));
      }

      state.filteredItems = result;
    },
    resetFilters: (state) => {
      state.filters = {
        searchTerm: "",
        minPrice: "",
        maxPrice: "",
        ilanTuru: "",
        sehir: "",
      };
      state.filteredItems = [...state.items];
    },
    sortItems: (state, action) => {
      // action.payload: 'price_asc', 'price_desc', 'newest' vb.
      const sortType = action.payload;
      if (sortType === "price_asc") {
        state.filteredItems.sort((a, b) => a.fiyat - b.fiyat);
      } else if (sortType === "price_desc") {
        state.filteredItems.sort((a, b) => b.fiyat - a.fiyat);
      } else if (sortType === "newest") {
        state.filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIlanlar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIlanlar.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        // İlk yüklendiğinde filteredItems = items
        state.filteredItems = action.payload;
      })
      .addCase(fetchIlanlar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFilters, resetFilters, sortItems } = ilanSlice.actions;
export default ilanSlice.reducer;
