import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// connect to Mongo
mongoose.connect(MONGO_URI, { dbName: process.env.DB_NAME })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Error:", err.message));

const UserSchema = new mongoose.Schema({ name: String }, { timestamps: true });
const User = mongoose.model("User", UserSchema);

app.get("/api/health", (req, res) => res.json({ status: "ok", message: "Backend is running 🚀" }));
app.post("/api/users", async (req, res) => {
  const user = await User.create({ name: req.body.name });
  res.json(user);
});
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
