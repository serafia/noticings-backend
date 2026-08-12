import dotenv from "dotenv";
dotenv.config({ path: "./.env", quiet: true });

import { MongoClient } from "mongodb";

function expandEnvPlaceholders(str = "") {
  return str.replace(/\$\{([^}]+)\}/g, (_, name) => process.env[name] || "");
}

const mongoUri = expandEnvPlaceholders(process.env.MONGODB_URI || "");

const client = new MongoClient(mongoUri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
});

let database;

export async function connectDatabase() {
  if (database) return database;

  await client.connect();
  database = client.db(process.env.MONGODB_DATABASE || "noticings");

  console.log("Connected to MongoDB");
  return database;
}

export function getDatabase() {
  if (!database) {
    throw new Error("Database has not been connected");
  }

  return database;
}

export async function closeDatabase() {
  await client.close();
  console.log("MongoDB connection closed");
}
