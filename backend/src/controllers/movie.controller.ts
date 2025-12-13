import axios from "axios";
import { movieQueue } from "../queues/movie.queue.js";
import { Request, Response } from "express";

export const fetchMovieFromOMDb = async (req:Request, res:Response) => {
  const { title } = req.body;

  const response = await axios.get(
    `https://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}`
  );

  if (response.data.Response === "False") {
    return res.status(404).json({ message: "Movie not found" });
  }

  await movieQueue.add("import-movie", {
    omdbData: response.data,
    adminId: req.user?.id,
  });

  return res.json({
    message: "Movie added to queue for processing",
  });
};
