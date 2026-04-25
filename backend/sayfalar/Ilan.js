const express = require("express");
const router = express.Router();
const Ilan = require("../models/IlanSchema");
const multer = require("multer");
const verifyJWT = require("../middleware/verifyJWT");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ilan ekleme
router.post("/", verifyJWT, upload.array("resimler", 10), async (req, res) => {
  // أضفنا الحقول الجديدة هنا فقط
  const {
    baslik,
    aciklama,
    fiyat,
    sehir,
    ilce,
    ilanTuru,
    emlakTipi,
    metrekare,
    odaSayisi,
  } = req.body;

  if (!baslik || !aciklama || !fiyat || !emlakTipi) {
    return res.status(400).json({ error: "tüm alanlar zorunlu" });
  }

  // التعديل التقني: تخزين المسار النسبي لعرض الصور بشكل صحيح
  const resimler = req.files
    ? req.files.map((file) => `/public/images/${file.filename}`)
    : [];

  const yeniIlan = await Ilan.create({
    baslik,
    aciklama,
    fiyat,
    sehir,
    ilce,
    ilanTuru,
    emlakTipi,
    metrekare,
    odaSayisi,
    resimler,
  });
  res.status(200).json(yeniIlan);
});

// جلب إعلان واحد بواسطة الـ ID
// المسار: GET http://localhost:5000/api/ilan/:id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ilan = await Ilan.findById(id);

    if (!ilan) {
      return res.status(404).json({ error: "İlan bulunamadı" });
    }

    res.status(200).json(ilan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Sunucu İç Hatası" });
  }
});

// ilan duzeltme
router.put(
  "/:id",
  verifyJWT,
  upload.array("resimler", 10),
  async (req, res) => {
    const id = req.params.id;
    const {
      baslik,
      aciklama,
      fiyat,
      sehir,
      ilce,
      ilanTuru,
      emlakTipi,
      metrekare,
      odaSayisi,
    } = req.body;

    // التعديل التقني: نفس مسار الصور
    const resimler =
      req.files && req.files.length > 0
        ? req.files.map((file) => `/public/images/${file.filename}`)
        : undefined;

    try {
      const eskiIlan = await Ilan.findById(id);
      if (!eskiIlan) return res.status(404).json({ error: "ilan bulunmadi" });

      if (resimler && eskiIlan.resimler && eskiIlan.resimler.length > 0) {
        eskiIlan.resimler.forEach((resimPath) => {
          const fullPath = path.join(__dirname, "..", resimPath);
          if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        });
      }

      const updateData = {
        baslik,
        aciklama,
        fiyat,
        sehir,
        ilce,
        ilanTuru,
        emlakTipi,
        metrekare,
        odaSayisi,
      };
      if (resimler) updateData.resimler = resimler;

      const ilan = await Ilan.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).json(ilan);
    } catch (error) {
      res.status(500).json({ error: "Sunucu İç Hatası" });
    }
  },
);

// باقي الكود (get, delete) كما هو تماماً في ملفك
router.get("/", async (req, res) => {
  const ilanlar = await Ilan.find().sort({ createdAt: -1 });
  res.status(200).json(ilanlar);
});

router.delete("/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  try {
    const ilan = await Ilan.findById(id);
    if (!ilan) return res.status(404).json({ error: "ilan bulunmadi" });
    if (ilan.resimler) {
      ilan.resimler.forEach((resimPath) => {
        const fullPath = path.join(__dirname, "..", resimPath);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      });
    }
    await Ilan.findByIdAndDelete(id);
    res.status(200).json({ message: "ilan silindi" });
  } catch (error) {
    res.status(500).json({ error: "Sunucu İç Hatası" });
  }
});

module.exports = router;
