import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import ilanReducer from "./ilanSlice";
import favoritesReducer from "./favoritesSlice";
import ayarlarReducer from "./ayarlarSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    ilan: ilanReducer,
    favorites: favoritesReducer,
    ayarlar: ayarlarReducer,
  },
});

export default store;
