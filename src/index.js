
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./src/config/db");

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();


app.use(helmet());
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL,      
  "http://localhost:5000",     
  "http://127.0.0.1:3000"
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); 
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS blocked: " + origin), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);


const authRoutes = require("./src/routes/auth");
const itemRoutes = require("./src/routes/items");
const priceRoutes = require("./src/routes/price");
const profileRoutes = require("./src/routes/profile");

app.use("/api", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/price", priceRoutes);
app.use("/api/users", profileRoutes);


app.get("/", (req, res) =>
  res.json({ ok: true, message: "VoiceCart backend running 🚀" })
);


app.use((err, req, res, next) => {
  console.error("💥 SERVER ERROR:", err.message);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});


app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
