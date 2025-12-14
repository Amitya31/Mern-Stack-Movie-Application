import { Worker } from "bullmq";
import axios from "axios";
import dotenv from "dotenv";
import connection from "../config/redis.js";
import connectToDB from "../config/db.js";
import MovieModel from "../models/movie.model.js";

dotenv.config();

const OMDB_URL = "https://www.omdbapi.com/";

await connectToDB();


new Worker(
  "movie-import",
  async (job) => {
    try {
      const { imdbId } = job.data;
      console.log("Processing:", imdbId);
      console.log(process.env.OMDB_API_KEY)
      const response = await axios.get(OMDB_URL, {
        params: {
          i: imdbId,
          apikey: process.env.OMDB_API_KEY as string,
        },
      });
      

      if (response.data.Response === "False") {
        throw new Error(response.data.Error);
      }

      const data = response.data;
      const duration = parseInt(data.Runtime);

      const movie = await MovieModel.findOneAndUpdate(
        { imdbId: data.imdbID },
        {
          imdbId: data.imdbID,
          title: data.Title,
          description: data.Plot,
          releaseYear: Number(data.Year),
          duration: isNaN(duration) ? null : duration,
          genre: data.Genre?.split(", "),
          imdbRating: Number(data.imdbRating),
          poster: data.Poster,
          source: "OMDb",
        },
        { upsert: true, new: true, runValidators: true }
      );

      console.log("Inserted:", movie.title);
    } catch (err: any) {
      console.error("JOB FAILED:", job.data.imdbId);
      console.error(err.response?.data || err.message || err);
      throw err; 
    }
  },
  {
    connection,
    concurrency: 3,
  }
);
