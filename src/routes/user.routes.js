import express from "express";
import { getDatabase } from "../config/database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const db = getDatabase();

    const users = await db.collection("users").find({}).limit(50).toArray();

    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default router;
