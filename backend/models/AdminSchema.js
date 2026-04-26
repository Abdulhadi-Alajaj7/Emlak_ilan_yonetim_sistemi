const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    Admin_Adi: {
      type: String,
      required: true,
      unique: true,
    },
    sifre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    rol: {
      type: String,
      default: "admin",
    },
    sifreUzunlugu: {
      type: Number,
      default: 8,
    },
    fotograf: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Admin", AdminSchema);
