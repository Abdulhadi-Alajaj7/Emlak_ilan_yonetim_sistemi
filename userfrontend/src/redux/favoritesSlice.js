import { createSlice } from "@reduxjs/toolkit";

const loadFavorites = () => {
  try {
    const serialized = localStorage.getItem("app-favorites");
    if (serialized === null) return [];
    return JSON.parse(serialized);
  } catch (e) {
    return [];
  }
};

const saveFavorites = (favorites) => {
  try {
    const serialized = JSON.stringify(favorites);
    localStorage.setItem("app-favorites", serialized);
  } catch (e) {
    console.error("Favoriler kaydedilemedi", e);
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: loadFavorites(), // Obje array'i tutulacak
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const ilan = action.payload;
      const exists = state.items.find((item) => item._id === ilan._id);
      
      if (exists) {
        state.items = state.items.filter((item) => item._id !== ilan._id);
      } else {
        state.items.push(ilan);
      }
      
      saveFavorites(state.items);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
