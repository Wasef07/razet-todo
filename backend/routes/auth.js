import express from "express";
import { createUser, getUserByEmail } from "../models/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = 12;

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }
    await createUser(email, username, hashPassword);
    res.status(201).json({ message: "Sign Up Successful" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await getUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({ message: "Please Sign Up First" });
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const { password, ...others } = user;
    res.status(200).json({ message: "Login successful", ...others });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
});

export default router;
