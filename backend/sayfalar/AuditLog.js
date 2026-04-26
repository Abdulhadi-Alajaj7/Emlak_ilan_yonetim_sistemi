const express = require("express");
const router = express.Router();
const AuditLog = require("../models/AuditLogSchema");
const verifyJWT = require("../middleware/verifyJWT");
const verifySuperAdmin = require("../middleware/verifySuperAdmin");

// Tüm logları getir (sadece super admin)
router.get("/", verifyJWT, verifySuperAdmin, async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;
