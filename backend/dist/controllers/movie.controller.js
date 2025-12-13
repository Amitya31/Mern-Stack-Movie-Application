import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
export const fetchMovieFromOMDb = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({
                message: "Movie title is required",
            });
        }
        const response = await axios.get("https://www.omdbapi.com/", {
            params: {
                t: title,
                apikey: process.env.OMDB_API_KEY,
            },
        });
        if (response.data.Response === "False") {
            return res.status(404).json({
                message: response.data.Error,
            });
        }
        return res.json({
            message: "Movie fetched successfully from OMDb",
            data: response.data,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch movie from OMDb",
        });
    }
};
//# sourceMappingURL=movie.controller.js.map