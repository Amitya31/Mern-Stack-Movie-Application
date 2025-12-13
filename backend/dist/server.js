import express from "express";
import dotenv from "dotenv";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    return res.json({
        message: "Hello world"
    });
});
app.listen(3000, () => {
    console.log("Port runnning on 3000");
});
//# sourceMappingURL=server.js.map