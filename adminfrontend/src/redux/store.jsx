import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ilanReducer from "./ilanSlice";
import personelReducer from "./personelSlice";
import mesajReducer from "./mesajSlice";
import ayarlarReducer from "./ayarlarSlice";

 const store = configureStore({
  reducer: {
    auth: authReducer,
    ilan: ilanReducer,
    personel: personelReducer,
    mesaj: mesajReducer,
    ayarlar: ayarlarReducer,
  },
});

export default store;