// MongoDB/Express backend for Rights Quest India.
// Stores password hashes, not plain passwords, and returns exact auth errors.

import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 6, max: 16, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  passwordHash: { type: String, required: true },
  points: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  completedChapters: { type: [String], default: [] },
  quizScores: { type: Object, default: {} }
});

const User = mongoose.model("User", userSchema);

app.post("/api/auth/signup", async (req, res) => {
  const { name, age, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) return res.status(400).json({ message: "Passwords Do Not Match" });
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: "Email Already Registered" });
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, age, email, passwordHash });
  res.json(stripPrivate(user));
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User Not Found" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Incorrect Password" });
  res.json(stripPrivate(user));
});

app.post("/api/progress", async (req, res) => {
  const { email, moduleId, points, badge } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User Not Found" });
  if (!user.completedChapters.includes(moduleId)) user.completedChapters.push(moduleId);
  if (badge && !user.badges.includes(badge)) user.badges.push(badge);
  user.points += Number(points || 0);
  await user.save();
  res.json(stripPrivate(user));
});

function stripPrivate(user) {
  const object = user.toObject();
  delete object.passwordHash;
  return object;
}

const port = process.env.PORT || 5000;
await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/rightsquest");
app.listen(port, () => console.log(`Rights Quest API running on ${port}`));
