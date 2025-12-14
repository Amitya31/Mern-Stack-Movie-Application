import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import MovieList from "./pages/MovieList";
import AdminMovies from "./pages/AdminMovies";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";
import MovieSearch from "./pages/MovieSearch";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MovieList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <MovieSearch />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/movies"
          element={
            <ProtectedRoute role="admin">
              <AdminMovies />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
