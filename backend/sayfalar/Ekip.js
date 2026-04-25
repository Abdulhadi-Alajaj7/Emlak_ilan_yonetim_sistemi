const express = require("express");
const router = express.Router();
const Ekip = require("../models/EkipSchema");
const multer = require("multer");
const verifyJWT = require("../middleware/verifyJWT");

const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({            // resimleri nerde saklicamizi belirlemek
  destination: (req, file, cb) => {
    cb(null, "public/persyonel_images");
  },
  filename: (req, file, cb) => {                //    burda saklicamiz resmin ismini belirliyoruz 
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {         // resimden başka dosya yüklemye izin vermiyoruz 
    cb(null, true);
  } else {
    cb(new Error("Sadece resim yüklenebilir"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

//persyonel ekle
//localhost:5000/api/ekip/
router.post("/", verifyJWT, upload.single("resim"), async (req, res) => {   // frontendteki  resim yükleme alani name="resim" olmali 
  const { adSoyad, gorev, email } = req.body;

  if (!adSoyad || !gorev || !email) {
    return res.status(400).json({ error: "tüm alanlar zorunlu" });
  }
  const resim = req.file ? req.file.path : "";

  const yeniIlan = await Ekip.create({
    adSoyad,
    gorev,
    email,
    fotograf: resim,
  });
  res.status(200).json(yeniIlan);
});

//tum bersyoneler
//localhost:5000/api/ekip/
router.get("/", async (req, res) => {
  try {
    const persyoneller = await Ekip.find();
    res.status(200).json(persyoneller);
  } catch (error) {
    res.status(500).json({ error: "Sunucu İç Hatası" });
  }
});

//tek persyonle getir
//localhost:5000/api/ekip/:id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const persyonel = await Ekip.findById(id);

    if (!persyonel) {
      return res.status(404).json({ error: "persyonel bulunmadi" });
    }

    res.status(200).json(persyonel);
  } catch (error) {
    res.status(500).json({ error: "Sunucu İç Hatası" });
  }
});

//persyonel bilgilerinei duzeltmek
//localhost:5000/api/ekip/:id
router.put("/:id", verifyJWT, upload.single("resim"), async (req, res) => {
  const id = req.params.id;
  const { adSoyad, gorev, email } = req.body;

  try {
    const ekip = await Ekip.findById(id);
    if (!ekip) return res.status(404).json({ error: "persyonel bulunamadı" });

    if (req.file && ekip.fotograf) {
      const oldPath = path.join(__dirname, "..", ekip.fotograf);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const updateData = { adSoyad, gorev, email };
    if (req.file) updateData.fotograf = req.file.path;

    const updatedEkip = await Ekip.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedEkip);
  } catch (error) {
    res.status(500).json({ error: "Sunucu İç Hatası" });
  }
});

//persyonel silmek
//localhost:5000/api/ekip/id
router.delete("/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;

  try {
    const ekip = await Ekip.findById(id);
    if (!ekip) {
      return res.status(404).json({ error: "persyonel bulunamadı" });
    }

    if (ekip.fotograf) {
      const fullPath = path.join(__dirname, "..", ekip.fotograf);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await Ekip.findByIdAndDelete(id);

    res.status(200).json({ message: "persyonel ve fotograf silindi" });
  } catch (error) {
    res.status(500).json({ error: "Sunucu İç Hatası" });
  }
});

module.exports = router;
