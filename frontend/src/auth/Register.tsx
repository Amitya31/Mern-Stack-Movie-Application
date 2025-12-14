import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type Role = "user" | "admin";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    username: string;
    email: string;
    password: string;
    role: Role;
  }>({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (
    key: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      await register(
        form.username,
        form.email,
        form.password,
        form.role
      );

      toast.success("Registration successful 🎉");
      navigate("/");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width={350}
      mx="auto"
      mt={10}
    >
      <Typography variant="h5">Register</Typography>

      <TextField
        label="Username"
        value={form.username}
        onChange={(e) => handleChange("username", e.target.value)}
      />

      <TextField
        label="Email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />

      <TextField
        select
        label="Role"
        value={form.role}
        onChange={(e) =>
          handleChange("role", e.target.value)
        }
      >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>

      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>
    </Box>
  );
}
