import { Router } from "express";
import {
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = Router();

router.post("/admin/movies", authMiddleware, adminOnly, createMovie);
router.put("/admin/movies/:id", authMiddleware, adminOnly, updateMovie);
router.delete("/admin/movies/:id", authMiddleware, adminOnly, deleteMovie);

export default router;
