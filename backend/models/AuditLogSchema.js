const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    adminAdi: {
      type: String,
      required: true,
    },
    islem: {
      type: String,
      required: true,
    },
    detay: {
      type: String,
    },
    ip: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("AuditLog", AuditLogSchema);
