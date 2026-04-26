const express = require("express");
const router = express.Router();
const Ayarlar = require("../models/AyarlarSchema");
const verifyJWT = require("../middleware/verifyJWT");
const logAction = require("../utils/logger");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/Ayarlar_images`); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    let settings = await Ayarlar.findOne();
    if (!settings) {
      settings = await Ayarlar.create({});
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: "Ayarlar getirilemedi" });
  }
});

router.put("/", verifyJWT, upload.single("siteLogosu"), async (req, res) => {
  try {
    let updateData = { ...req.body };

    // تحويل النصوص القادمة من FormData إلى كائنات ومصفوفات
    if (updateData.telefonlar) updateData.telefonlar = JSON.parse(updateData.telefonlar);
    if (updateData.epostalar) updateData.epostalar = JSON.parse(updateData.epostalar);
    if (updateData.sosyalMedya) updateData.sosyalMedya = JSON.parse(updateData.sosyalMedya);

    if (req.file) {
      // تصحيح المسار ليتوافق مع اسم المجلد في الـ public
      updateData.siteLogosu = `/public/Ayarlar_images/${req.file.filename}`;
    }

    const settings = await Ayarlar.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
    });

    await logAction(req.adminData._id, req.adminData.Admin_Adi, "Ayar Değiştirdi", "Site ayarları güncellendi", req.ip);

    res.status(200).json(settings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Güncelleme başarısız" });
  }
});

module.exports = router;