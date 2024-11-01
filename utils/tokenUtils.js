const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET

// Middleware för att verifiera JWT
exports.authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Ingen token tillhandahållen" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Ogiltig token" });
    req.user = user;
    next();
  });
};

// Middleware för att kontrollera admin-rättigheter
exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Endast admins har tillgång" });
  }
  next();
};
