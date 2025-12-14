import { useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      toast.success("Login successful 🎉");
      navigate("/");
    } catch {
      toast.error("Invalid email or password");
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
      <Typography variant="h5">Login</Typography>

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>

      {/* ✅ Register link */}
      <Typography variant="body2" textAlign="center">
        New user?{" "}
        <Link
          component="button"
          onClick={() => navigate("/register")}
        >
          Register here
        </Link>
      </Typography>
    </Box>
  );
}
