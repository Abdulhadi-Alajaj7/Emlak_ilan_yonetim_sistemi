const Admin = require("../models/AdminSchema");

const verifySuperAdmin = async (req, res, next) => {
  try {
    if (!req.adminData) {
      return res.status(401).json({ message: "Yasak: Admin bulunamadi" });
    }

    if (req.adminData.rol !== "super_admin") {
      return res.status(403).json({ message: "Erisim Reddedildi: Sadece Super Admin yetkilidir" });
    }

    next();
  } catch (error) {
    console.error("Super Admin dogrulama hatasi:", error);
    res.status(500).json({ message: "Sunucu hatasi" });
  }
};

module.exports = verifySuperAdmin;
