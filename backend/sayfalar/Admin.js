const express = require("express");
const router = express.Router();
const Admin = require("../models/AdminSchema");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyJWT = require("../middleware/verifyJWT");

const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./public/Admin_images`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Sadece resim yüklenebilir"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ali kaya  123456

//kulanci ekle
//http://localhost:5000/api/admin/register
router.post("/register", upload.single("resim"), async (req, res) => {
  const { Admin_Adi, sifre, email } = req.body;
  console.log(req.body);
console.log(req.file);

  if (!Admin_Adi || !sifre || !email) {
    return res.status(404).json({ error: "tüm alanlar zorunlu" });
  }
  const resim = req.file ? `/public/Admin_images/${req.file.filename}` : "";

  const foundUser = await Admin.findOne({ email }).exec();
  if (foundUser) {
    return res.status(401).json({ message: "kullanci zaten mevcut" });
  }
  const hashedPassword = await bcrypt.hash(sifre, 10);

  const yeniAdmin = await Admin.create({
    Admin_Adi,
    sifre: hashedPassword,
    email,
    fotograf: resim,
  });
  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: yeniAdmin._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
  const refreshToken = jwt.sign(
    {
      UserInfo: {
        id: yeniAdmin._id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: false, //https
    sameSite: "Lax", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    accessToken,
    email: yeniAdmin.email,
    Admin_Adi: yeniAdmin.Admin_Adi,
  });
});

//login
//http://localhost:5000/api/admin/login
router.post("/login", async (req, res) => {
  const { email, sifre } = req.body;
  if (!email || !sifre) {
    return res.status(400).json({ message: "tüm alanlar zorunlu" });
  }
  const admin = await Admin.findOne({ email }).exec();
  if (!admin) {
    return res.status(404).json({ message: "kulanci yok !" });
  }
  const match = await bcrypt.compare(sifre, admin.sifre);

  if (!match) return res.status(404).json({ message: "yanliş şife" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: admin._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    {
      UserInfo: {
        id: admin._id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: false, //https
    sameSite: "Lax", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({
    accessToken,
    ad_soyad: admin.Admin_Adi,
    email: admin.email,
    fotograf: admin.fotograf,
  });
});

//access token refresh
//http://localhost:5000/api/admin/login
router.get("/refresh", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Yetkisiz" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Yasak" });

      const admin = await Admin.findById(decoded.UserInfo.id).exec();
      if (!admin) return res.status(401).json({ message: "Yetkisiz" });

      const accessToken = jwt.sign(
        { UserInfo: { id: admin._id } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" },
      );

      res.json({
        accessToken,
        ad_soyad: admin.Admin_Adi,
        email: admin.email,
        fotograf: admin.fotograf,
      });
    },
  );
});

// logout
//http://localhost:5000/api/admin/logout
router.post("/logout", (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });

  res.json({ message: "Cookie cleared" });
});

//admin bilgilerinei duzeltmek
//localhost:5000/api/kullanci/:id
// 1. أزلنا ":id" من الرابط لأنه لم يعد مطلوباً
router.put("/update-me", verifyJWT, upload.single("resim"), async (req, res) => {
  
  // 2. سحبنا الـ ID من التوكن مباشرة (req.user) الذي تم فكه في الـ Middleware
  const id = req.user; 

  const { Admin_Adi, sifre, email } = req.body;

  try {
    // 3. البحث باستخدام الـ ID القادم من التوكن
    const duzeltilmis_Admin = await Admin.findById(id);
    if (!duzeltilmis_Admin)
      return res.status(404).json({ error: "Yönetici bulunamadı" });

    // منطق حذف الصورة القديمة
    if (req.file && duzeltilmis_Admin.fotograf) {
      const oldPath = path.join(__dirname, "..", duzeltilmis_Admin.fotograf);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const updateData = { Admin_Adi, email };
    
    // حفظ مسار الصورة الجديدة
    if (req.file) updateData.fotograf = `/public/Admin_images/${req.file.filename}`;

    if (sifre) {
      const hashedPassword = await bcrypt.hash(sifre, 10);
      updateData.sifre = hashedPassword;
    }

    // 4. التحديث النهائي باستخدام الـ ID الموثوق
    const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: "Sunucu İç Hatası" });
  }
});
//admin silmek
//localhost:5000/api/kullanci/id
router.delete("/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  if (req.user.id !== id) {
    return res.status(403).json({ error: "Yetkisiz işlem" });
  }

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ error: "persyonel bulunamadı" });
    }

    if (admin.fotograf) {
      const fullPath = path.join(__dirname, "..", admin.fotograf);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await Admin.findByIdAndDelete(id);

    res.status(200).json({ message: "persyonel ve fotograf silindi" });
  } catch (error) {
    res.status(500).json({ error: "Sunucu İç Hatası" });
  }
});

router.get("/me", verifyJWT, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-sifre");
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;
