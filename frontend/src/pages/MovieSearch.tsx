import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Typography,
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

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(async () => {
      try {
        const res = await api.get("/movies/search", {
          params: {
            q: query,
            page,
            limit: 6,
          },
        });

        setMovies(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Search failed", err);
      }
    }, 500); // debounce

    return () => clearTimeout(timer);
  }, [query, page]);

  return (
    <Box p={3}>
      {/* Search Input */}
      <TextField
        fullWidth
        label="Search movies by title or description"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          setPage(1);

          // ✅ clear results immediately when input is empty
          if (!value.trim()) {
            setMovies([]);
            setTotalPages(1);
          }
        }}
      />

      {/* Results */}
      <Box
        mt={4}
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
              <Typography variant="h6">{movie.title}</Typography>

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
      {movies.length > 0 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
