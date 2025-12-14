import express from "express";
import dotenv from "dotenv";
import adminRouter from "./routers/admin.route.js"
import movieRouter from "./routers/movie.route.js"
import authRouter from "./routers/user.route.js"
import connectToDB from "./config/db.js";
import cors from "cors";

dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Vite default
    credentials: true,
  })
);
app.use(express.json());

const startServer = async () => {
  try {
    await connectToDB(); 

    app.use("/api/v1", authRouter)
    app.use("/api/v1", movieRouter);
    app.use("/api/v1",adminRouter);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
};

startServer();



