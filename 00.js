// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Schema User
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model("User", UserSchema);

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Get All Users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Create User
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  await newUser.save();
  res.json(newUser);
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
