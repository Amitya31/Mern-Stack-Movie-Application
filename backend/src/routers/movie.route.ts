import { Router } from "express";
import { fetchMovieFromOMDb } from "../controllers/movie.controller.js";

const router = Router()

router.get('/movie',fetchMovieFromOMDb);

export default router;