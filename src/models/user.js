import { getDatabase } from "../config/database.js";

export const createUser = async ({ email, password }) => {
  const db = await getDatabase();
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const bcrypt = await import("bcryptjs");
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    email,
    password: hashedPassword,
    createdAt: new Date(),
  };

  const result = await db.collection("users").insertOne(user);
  return result.insertedId;
};

export const findUserByEmail = async (email) => {
  const db = await getDatabase();
  return await db.collection("users").findOne({ email });
};

export const verifyPassword = async (password, hashedPassword) => {
  const bcrypt = await import("bcryptjs");
  return await bcrypt.compare(password, hashedPassword);
};

export const getUsers = async () => {
  const db = await getDatabase();
  return await db.collection("users").find({}).toArray();
};
