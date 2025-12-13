import express from "express";
import dotenv from "dotenv";
import documentRouter from "./routers/movie.route.js"

dotenv.config()

const app = express();

app.use(express.json());


app.use('/api/v1',documentRouter)

app.listen(3000,()=>{
    console.log("Port runnning on 3000")
})


