const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken, authorizeAdmin } = require("../utils/tokenUtils");


//ROUTES

// Registrera och logga in
router.post("/register", authController.register);
router.post("/login", authController.login);

// Skyddade routes
router.get("/posts", authenticateToken, (req, res) => {
  res.json({ message: `Här är dina inlägg, ${req.user.username}` });
});

router.get("/admin/posts", authenticateToken, authorizeAdmin, (req, res) => {
  res.json({ message: "Här är alla användares inlägg, endast synligt för admins" });
});

module.exports = router;
