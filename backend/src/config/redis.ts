import { Redis } from "ioredis";

const connection = new Redis(process.env.REDIS_URL as string, {
  tls: {},                 
  maxRetriesPerRequest: null, 
});

connection.on("connect", () => {
  console.log("Connected to Upstash Redis");
});

connection.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default connection;
