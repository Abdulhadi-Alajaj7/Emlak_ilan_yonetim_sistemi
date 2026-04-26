const express = require("express");
const router = express.Router();
const Admin = require("../models/AdminSchema");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const logAction = require("../utils/logger");

// Şifremi Unuttum (Forgot Password) İstek Atma
// POST /api/auth/forgot-password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // 1. .ENV KONTROLÜ (Çok Önemli)
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("KRİTİK HATA: .env dosyasında EMAIL_USER veya EMAIL_PASS bulunamadı!");
      return res.status(500).json({ 
        error: "E-posta ayarları eksik. Lütfen .env dosyanızı kontrol edin ve backend sunucusunu (npm run dev) YENİDEN BAŞLATIN." 
      });
    }

    // 2. Nodemailer Transporter Kurulumu
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER.trim(),
        pass: process.env.EMAIL_PASS.trim(),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 2.1 Bağlantıyı Test Et (Debug Modu)
    try {
      await transporter.verify();
      console.log("SMTP Bağlantısı Başarılı: Mail gönderimi için hazır.");
    } catch (verifyError) {
      console.error("SMTP Bağlantı Doğrulama Hatası:");
      console.error(verifyError);
      throw new Error("SMTP_VERIFY_FAILED: " + verifyError.message);
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(200).json({ message: "Şifre sıfırlama linki e-postanıza gönderildi (eğer kayıtlıysa)." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    admin.resetPasswordToken = resetToken;
    admin.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await admin.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"Emlak Yönetim Sistemi" <${process.env.EMAIL_USER}>`,
      to: admin.email,
      subject: "🔒 Şifre Sıfırlama İsteği",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #dc3545; text-align: center;">Şifre Sıfırlama Talebi</h2>
          <p>Merhaba <b>${admin.Admin_Adi}</b>,</p>
          <p>Hesabınız için şifre sıfırlama isteği aldık. Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #dc3545; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Şifremi Sıfırla</a>
          </div>
          <p style="color: #666; font-size: 14px;">Eğer bu isteği siz yapmadıysanız, lütfen bu e-postayı görmezden gelin. Şifreniz değişmeyecektir.</p>
          <p style="color: #666; font-size: 14px;"><b>Not:</b> Bu bağlantı sadece 15 dakika boyunca geçerlidir.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    await logAction(admin._id, admin.Admin_Adi, "Şifre Sıfırlama İsteği", "Şifre sıfırlama maili gönderildi", req.ip);

    res.status(200).json({ message: "Şifre sıfırlama linki e-postanıza gönderildi." });

  } catch (error) {
    console.error("Şifre sıfırlama maili gönderilirken hata oluştu:");
    console.error(error);
    
    let errorMessage = "E-posta gönderimi başarısız oldu.";
    
    if (error.message.includes("SMTP_VERIFY_FAILED") || error.message.includes("Invalid login") || error.responseCode === 535) {
      errorMessage = "Hata: Gmail kullanıcı adı veya Uygulama Şifresi (App Password) yanlış. Lütfen .env dosyanızdaki bilgileri ve Google Uygulama Şifrenizi kontrol edin.";
    } else if (error.message.includes("Missing credentials")) {
      errorMessage = "Hata: E-posta giriş bilgileri eksik. .env dosyanızı kontrol edin.";
    } else {
      errorMessage += " Detay: " + error.message;
    }

    res.status(500).json({ error: errorMessage });
  }
});

// Şifreyi Yeniden Belirleme (Reset Password)
// POST /api/auth/reset-password/:token
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { sifre } = req.body;

  try {
    // 1. DB'de token'ı ara ve süresi dolmamış mı kontrol et ($gt: Date.now() = now'dan büyük olmalı)
    const admin = await Admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    // Bulunamadıysa veya süre dolduysa:
    if (!admin) {
      return res.status(400).json({ error: "Geçersiz veya süresi dolmuş token!" });
    }

    if (!sifre || sifre.length < 6) {
        return res.status(400).json({ error: "Şifre en az 6 karakter olmalıdır." });
    }

    // 2. Yeni şifreyi Hashle ve kaydet
    const hashedPassword = await bcrypt.hash(sifre, 10);
    admin.sifre = hashedPassword;
    admin.sifreUzunlugu = sifre.length;
    
    // 3. Güvenlik için token verilerini tamamen temizle
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;

    await admin.save();

    await logAction(admin._id, admin.Admin_Adi, "Şifre Sıfırlandı", "Kullanıcı şifresini başarıyla yeniledi.", req.ip);

    res.status(200).json({ message: "Şifreniz başarıyla güncellendi! Yeni şifrenizle giriş yapabilirsiniz." });

  } catch (error) {
    console.error("Şifre yenilenirken hata:", error);
    res.status(500).json({ error: "Sunucu hatası!" });
  }
});

module.exports = router;
