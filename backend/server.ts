import app from "./app";
import { env } from "./common/config/env";
import { connectDB } from "./common/config/db";

const startServer = async () => {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
  });
};

startServer();
