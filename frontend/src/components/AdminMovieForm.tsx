import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import api from "../api/axios";
import toast from "react-hot-toast";
import {type AdminMovie } from "../types/movie";

interface MovieFormProps {
  movie: AdminMovie | null;
  onSuccess: () => void;
}

export default function AdminMovieForm({ movie, onSuccess }: MovieFormProps) {
  const [form, setForm] = useState({
    imdbId: movie?.imdbId ?? "",
    title: movie?.title ?? "",
    description: movie?.description ?? "",
    releaseYear: movie?.releaseYear ?? "",
    duration: movie?.duration ?? "",
  });

  const handleChange = (
    key: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!form.imdbId) {
        toast.error("IMDb ID is required");
        return;
      }

      if (movie) {
        await api.put(`/admin/movies/${movie._id}`, form);
        toast.success("Movie updated successfully ✏️");
      } else {
        await api.post("/admin/movies", form);
        toast.success("Movie added successfully 🎬");
      }

      setForm({
        imdbId: "",
        title: "",
        description: "",
        releaseYear: "",
        duration: "",
      });

      await onSuccess();
    } catch  {
      toast.error(
        "Something went wrong"
      );
    
    }
  };

  return (
    <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
      <TextField
        label="IMDb ID"
        value={form.imdbId}
        onChange={(e) => handleChange("imdbId", e.target.value)}
      />

      <TextField
        label="Title"
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <TextField
        label="Description"
        value={form.description}
        onChange={(e) =>
          handleChange("description", e.target.value)
        }
      />

      <TextField
        label="Release Year"
        type="number"
        value={form.releaseYear}
        onChange={(e) =>
          handleChange("releaseYear", e.target.value)
        }
      />

      <TextField
        label="Duration (min)"
        type="number"
        value={form.duration}
        onChange={(e) =>
          handleChange("duration", e.target.value)
        }
      />

      <Button variant="contained" onClick={handleSubmit}>
        {movie ? "Update Movie" : "Add Movie"}
      </Button>
    </Box>
  );
}
