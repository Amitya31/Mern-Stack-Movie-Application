import express from "express";
import dotenv from "dotenv";
import adminRouter from "./routers/admin.route.js"
import movieRouter from "./routers/movie.route.js"
import authRouter from "./routers/user.route.js"
import connectToDB from "./config/db.js";

dotenv.config()

const app = express();

app.use(express.json());

const startServer = async () => {
  try {
    await connectToDB(); 

    app.use("/api/v1", authRouter)
    app.use("/api/v1", movieRouter);
    app.use("/api/v1",adminRouter);

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
};

startServer();



