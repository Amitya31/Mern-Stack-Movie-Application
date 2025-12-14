import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Pagination,
} from "@mui/material";
import api from "../api/axios";
import AdminMovieForm from "../components/AdminMovieForm";
import {type AdminMovie } from "../types/movie";
import { toast } from "react-hot-toast";

export default function AdminMovies() {
  const [movies, setMovies] = useState<AdminMovie[]>([]);
  const [editMovie, setEditMovie] = useState<AdminMovie | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 10;

  // ✅ React-approved pattern
  useEffect(() => {


    const loadMovies = async () => {
      try {
        const res = await api.get("/movies", {
          params: { page, limit: LIMIT },
        });


        setMovies(Array.isArray(res.data?.data) ? res.data.data : []);
        setTotalPages(res.data?.totalPages ?? 1);
      } catch {
        toast.error("Failed to fetch movies");
      }
    };

    loadMovies();

    
  }, [page]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/admin/movies/${id}`);
      toast.success("Movie deleted");
      setPage(1); 
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSuccess = () => {
    setEditMovie(null);
    setPage(1); // refresh list after add/edit
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
                <Button onClick={() => setEditMovie(movie)}>Edit</Button>
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

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
}
