import app from "./app.js";
import { connectDatabase, closeDatabase } from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDatabase();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on("SIGINT", async () => {
      await closeDatabase();
      server.close(() => process.exit(0));
    });

    process.on("SIGTERM", async () => {
      await closeDatabase();
      server.close(() => process.exit(0));
    });
  } catch (error) {
    console.error("Could not start server:", error);
    process.exit(1);
  }
}

startServer();
