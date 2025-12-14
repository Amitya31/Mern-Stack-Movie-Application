import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import theme from "./theme";
import { AuthProvider } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster position="top-right" />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);
