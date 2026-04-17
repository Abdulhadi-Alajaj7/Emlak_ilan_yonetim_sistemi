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
      immutable: true,
    },
    fotograf: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Admin", AdminSchema);
