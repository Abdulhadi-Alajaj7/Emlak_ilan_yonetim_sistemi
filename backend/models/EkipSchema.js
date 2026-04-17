const mongoose = require("mongoose");

const EkipSchema = new mongoose.Schema({
  adSoyad: { type: String, required: true },
  gorev: { type: String, required: true },
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rol: {
    type: String,
    default: "persyonel",
    immutable: true, 
  },
  fotograf: String,
});

module.exports = mongoose.model("ekip", EkipSchema);
