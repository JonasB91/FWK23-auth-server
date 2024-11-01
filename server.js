require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Auth-server körs på port ${PORT}`);
});
