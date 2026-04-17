const mongoose = require("mongoose");

const AyarlarSchema = new mongoose.Schema({
  // معلومات الهوية
  siteAdi: { type: String, default: "Emlak Pro" },
  siteLogosu: { type: String }, // مسار الصورة
  hakkimizdaKisa: { type: String },

  // معلومات التواصل (مصفوفات لدعم أكثر من رقم وإيميل)
  telefonlar: [{ type: String }], 
  epostalar: [{ type: String }],
  whatsapp: { type: String },
  adres: { type: String },
  haritaKonum: { type: String }, // رابط Google Maps

  // السوشيال ميديا
  sosyalMedya: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    youtube: { type: String }
  },

  // إعدادات إضافية
  calismaSaatleri: { type: String, default: "Pzt - Cmt: 09:00 - 18:00" },
  bakimModu: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Ayarlar", AyarlarSchema);