import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          🎬 MovieApp
        </Typography>

        <Box display="flex" gap={2}>
          {user &&(
            <Button color="inherit" component={Link} to="/search">
              Search
            </Button>
          )}

          {user?.role === "admin" && (
            <Button color="inherit" component={Link} to="/admin/movies">
              Admin
            </Button>
          )}

          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
