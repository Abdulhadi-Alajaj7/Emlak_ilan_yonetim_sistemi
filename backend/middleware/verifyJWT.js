const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {

  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "izin yok " });
  }


  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "yasak" });
    
    req.user = decoded.UserInfo.id; 
    try {
      const Admin = require("../models/AdminSchema");
      req.adminData = await Admin.findById(req.user);
    } catch (e) {
      console.error(e);
    }
    
    next(); 
  });
};

module.exports = verifyJWT;