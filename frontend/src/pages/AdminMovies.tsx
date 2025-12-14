import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import api from "../api/axios";
import AdminMovieForm from "../components/AdminMovieForm";
import {type AdminMovie } from "../types/movie";
import toast from "react-hot-toast";

export default function AdminMovies() {
  const [movies, setMovies] = useState<AdminMovie[]>([]);
  const [editMovie, setEditMovie] = useState<AdminMovie | null>(null);

  const fetchMovies = useCallback(async () => {
    const res = await api.get("/movies");
    setMovies(res.data.data);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMovies();
  }, [fetchMovies]);

  const handleSuccess = async () => {
    await fetchMovies();
    setEditMovie(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/admin/movies/${id}`);
      toast.success("Movie deleted ");
      fetchMovies();
    } catch {
      toast.error("Failed to delete movie");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Admin Movies
      </Typography>

      <AdminMovieForm
        key={editMovie?._id || "new"}
        movie={editMovie}
        onSuccess={handleSuccess}
      />

      <Box mt={4} display="grid" gap={2}>
        {movies.map((movie) => (
          <Card key={movie._id}>
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>
                {movie.title} ({movie.releaseYear})
              </Typography>

              <Box>
                <Button onClick={() => setEditMovie(movie)}>
                  Edit
                </Button>

                <Button
                  color="error"
                  onClick={() => handleDelete(movie._id)}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
