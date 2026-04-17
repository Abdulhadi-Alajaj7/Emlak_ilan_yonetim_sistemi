const mongoose = require("mongoose");

const MesajSchema = new mongoose.Schema(
  {
    adSoyad: { type: String, required: true },
    telefon: String,
    eposta: String,
    mesaj: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("iletisimMesaj", MesajSchema);
