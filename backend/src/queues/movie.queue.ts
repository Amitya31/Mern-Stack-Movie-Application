import { Queue } from "bullmq";
import connection from "../config/redis.js";

export const movieQueue = new Queue("movie-import", {
  connection,
});
