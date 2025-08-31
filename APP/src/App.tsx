import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddBookPage from "./pages/AddBookPage";
import ReaderPage from "./pages/ReaderPage";
import { createTheme, ThemeProvider } from "@mui/material";

const colors = ["#ff4a47ff", "#922ddaff", "#3e50bfff", "#00897b", "#fdd835"];

const colorIndex = Math.round(Math.random() * 4);

const theme = createTheme({
  palette: { primary: { main: colors[colorIndex] } },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/addBook" element={<AddBookPage />} />
          <Route path="/readbook/:id" element={<ReaderPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
