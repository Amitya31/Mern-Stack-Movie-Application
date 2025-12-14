import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Select,
  MenuItem,
  Box,
  Pagination,
} from "@mui/material";
import api from "../api/axios";

interface Movie {
  _id: string;
  title: string;
  description: string;
  poster: string;
  imdbRating: number;
  releaseYear: number;
  duration: number;
}

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies", {
          params: {
            page,
            limit: 6,
            sortBy,
            order: "asc",
          },
        });

        if (!cancelled) {
          setMovies(res.data.data);
          setTotalPages(res.data.totalPages);
        }
      } catch (err) {
        console.error("Failed to fetch movies", err);
      }
    };

    fetchMovies();

    return () => {
      cancelled = true;
    };
  }, [page, sortBy]);

  return (
    <Box p={3}>
      {/* Sort Dropdown */}
      <Box mb={3} display="flex" justifyContent="flex-end">
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          size="small"
        >
          <MenuItem value="title">Title (A–Z)</MenuItem>
          <MenuItem value="imdbRating">Rating</MenuItem>
          <MenuItem value="releaseYear">Year</MenuItem>
          <MenuItem value="duration">Duration</MenuItem>
        </Select>
      </Box>

      {/* Movie Cards (CSS Grid) */}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={3}
      >
        {movies.map((movie) => (
          <Card key={movie._id}>
            <CardMedia
              component="img"
              height="300"
              image={movie.poster}
              alt={movie.title}
            />

            <CardContent>
              <Typography variant="h6" gutterBottom>
                {movie.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {movie.description.slice(0, 100)}...
              </Typography>

              <Typography variant="body2" mt={1}>
                ⭐ {movie.imdbRating} | {movie.releaseYear} | ⏱{" "}
                {movie.duration} min
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination */}
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}
