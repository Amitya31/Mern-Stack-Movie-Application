import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../App";
import MovieList from "../pages/MovieList";
import MovieSearch from "../pages/MovieSearch";
import AdminMovies from "../pages/AdminMovies";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <MovieList /> },
      { path: "/search", element: <MovieSearch /> },
      {
        path: "/admin/movies",
        element: (
          <AdminRoute>
            <AdminMovies />
          </AdminRoute>
        ),
      },
    ],
  },
]);
