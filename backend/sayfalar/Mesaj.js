const express = require("express");
const router = express.Router();
const Mesaj = require("../models/MesajSchema");
const verifyJWT=require("../middleware/verifyJWT");

//mesaj ekle
//localhost:5000/api/mesaj/
router.post("/",async (req, res) => {
  const { adSoyad, telefon, eposta, mesaj } = req.body;

  if (adSoyad == "" || telefon == "" || eposta == "" || mesaj == "") {
    return res.status(400).json({ error: "tüm alanları doldurun" });
  }

  const yeniMesaj = await Mesaj.create({
    adSoyad,
    telefon,
    eposta,
    mesaj,
  });
  res.status(200).json(yeniMesaj);
});

//tum mesajlar
//localhost:5000/api/mesaj/
router.get("/",verifyJWT, async (req, res) => {
  try {
    const Mesajlar = await Mesaj.find();
    res.status(200).json(Mesajlar);
  } catch (error) {
    res.status(500).json({error:"Sunucu İç Hatası"});
  }
});

//mesaj  getir
//localhost:5000/api/mesaj/:id
router.get("/:id",verifyJWT, async(req, res) => {
    const id = req.params.id;

    try {
        const mesaj=await Mesaj.findById(id);
        if(!mesaj){
            return res.status(404).json({ error: "mesaj bulunmadi" });
        }
        res.status(200).json(mesaj);
    } catch (error) {
        res.status(500).json({error:"Sunucu İç Hatası"});
    }


});

//mesaj silmek
//localhost:5000/api/mesaj/id
router.delete("/:id",verifyJWT, async(req, res) => {
    const id = req.params.id;
    try {
        const silinecekMesaj= await Mesaj.findById(id);
        if(!silinecekMesaj){
            return res.status(404).json({ error: "mesaj bulunmadi" });
        }
        await Mesaj.findByIdAndDelete(id);
        res.status(200).json(silinecekMesaj);
    } catch (error) {
        res.status(500).json({error:"Sunucu İç Hatası"});
    }
});

module.exports = router;
