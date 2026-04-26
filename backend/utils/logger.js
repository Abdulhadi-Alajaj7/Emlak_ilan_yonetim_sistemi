const AuditLog = require("../models/AuditLogSchema");

const logAction = async (adminId, adminAdi, islem, detay = "", ip = "") => {
  try {
    await AuditLog.create({
      adminId,
      adminAdi,
      islem,
      detay,
      ip,
    });
  } catch (error) {
    console.error("AuditLog kaydetme hatasi:", error);
  }
};

module.exports = logAction;
