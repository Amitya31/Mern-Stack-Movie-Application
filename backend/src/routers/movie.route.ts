import { Router } from "express";
import { getMovies, importTop250Movies, searchMovies } from "../controllers/movie.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = Router()

router.post(
  "/import-top-250",authMiddleware,adminOnly, importTop250Movies
);

router.get("/movies", authMiddleware,getMovies);
router.get("/movies/search",authMiddleware, searchMovies)


export default router;