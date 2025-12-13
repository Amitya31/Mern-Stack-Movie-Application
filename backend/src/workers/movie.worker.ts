import { Worker } from "bullmq";
import MovieModel from "../models/movie.model.js";
import connection from "../config/redis.js";

export const movieWorker = new Worker(
  "movie-import",
  async (job) => {
    const { omdbData, adminId } = job.data;

    const duration = parseInt(omdbData.Runtime); // "142 min" → 142

    await MovieModel.findOneAndUpdate(
      { imdbId: omdbData.imdbID },
      {
        imdbId: omdbData.imdbID,
        title: omdbData.Title,
        description: omdbData.Plot,
        releaseYear: Number(omdbData.Year),
        duration,
        genre: omdbData.Genre?.split(", "),
        imdbRating: Number(omdbData.imdbRating),
        poster: omdbData.Poster,
        createdBy: adminId,
      },
      { upsert: true, new: true }
    );
  },
  { connection }
);
