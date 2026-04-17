const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Veri tabani ile baglanti basarili");
  } catch (error) {
    console.error("MongoDB baglanti hatasi:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
