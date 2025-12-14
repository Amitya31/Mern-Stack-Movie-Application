import { Queue } from "bullmq";
import connection from "../config/redis.js";

export const movieQueue = new Queue("movie-import", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
