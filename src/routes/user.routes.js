import express from "express";
import { getDatabase } from "../config/database.js";
import {
  createUser,
  findUserByEmail,
  verifyPassword,
  getUsers,
} from "../models/user.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const userId = await createUser({ email, password });
    res.status(201).json({ userId });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
});

export default router;
