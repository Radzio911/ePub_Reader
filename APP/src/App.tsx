import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddBookPage from "./pages/AddBookPage";
import ReaderPage from "./pages/ReaderPage";
import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import useApi from "./api";
import { UserContext } from "./context/Usercontext";
import "./global.css";
import { LanguageContext, type LanguageName } from "./context/languageContext";
import polish from "./languages/polish";

const colors = ["#ff4a47ff", "#922ddaff", "#3e50bfff", "#00897b", "#fdd835"];

const colorIndex = Math.round(Math.random() * 4);

const theme = createTheme({
  palette: { primary: { main: colors[colorIndex] } },
});

function App() {
  const api = useApi();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState<LanguageName>("polish");
  useEffect(() => {
    api.get("/user").then((data) => {
      if (data.data.user.username) setUser(data.data.user);
      else setUser(null);
      console.log(data.data.user);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LanguageContext.Provider value={{ name, setName }}>
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
      </LanguageContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
