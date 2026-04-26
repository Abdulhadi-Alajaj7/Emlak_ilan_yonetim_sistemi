const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const connectDB = require("./config/DB_Baglanma");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],
    credentials: true, // Cookie ve token (JWT) gönderimine izin ver
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Gönderilebilecek header'lar (içerik tipi ve token)
  }),
);

connectDB();

app.use("/public", express.static(path.join(__dirname, "public")));

// sayfalar
app.use("/api/admin", require("./sayfalar/Admin"));
app.use("/api/ilan", require("./sayfalar/Ilan"));
app.use("/api/ekip", require("./sayfalar/Ekip"));
app.use("/api/mesaj", require("./sayfalar/Mesaj"));
app.use("/api/auth", require("./sayfalar/Auth"));
app.use("/api/ayarlar", require("./sayfalar/Ayarlar"));
app.use("/api/auditlogs", require("./sayfalar/AuditLog"));

app.listen(port, () => {
  console.log(`Server çalışıyor: http://localhost:${port}`);
});
