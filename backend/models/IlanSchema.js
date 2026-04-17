const mongoose = require("mongoose");

const IlanSchema = new mongoose.Schema(
  {
    baslik: { type: String, required: true },
    aciklama: { type: String, required: true },
    fiyat: { type: Number, required: true },
    sehir: { type: String, required: true },
    ilce: { type: String, required: true },
    metrekare: Number,
    odaSayisi: String,
    // التعديل الوحيد: إضافة نوع العقار
    emlakTipi: { type: String, required: true }, 
    ilanTuru: {
      type: String,
      enum: ["satılık", "kiralık"],
      required: true,
    },
    resimler: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("ilan", IlanSchema);