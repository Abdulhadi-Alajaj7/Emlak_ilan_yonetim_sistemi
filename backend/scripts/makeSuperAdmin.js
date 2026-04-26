const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: ".env" });
const Admin = require("../models/AdminSchema");
const connectDB = require("../config/DB_Baglanma");

const makeSuperAdmin = async () => {
  try {
    await connectDB();
    console.log("DB connected.");

    // Update all existing admins to super_admin initially (since the user likely only has one or few trusted ones)
    // Or just update the first one. Let's update all currently existing ones to avoid locking the user out.
    const result = await Admin.updateMany({}, { $set: { rol: "super_admin" } });
    
    console.log(`Updated ${result.modifiedCount} admin(s) to super_admin.`);
    process.exit(0);
  } catch (error) {
    console.error("Error updating admins:", error);
    process.exit(1);
  }
};

makeSuperAdmin();
