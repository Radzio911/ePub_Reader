import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import BookIcon from "@mui/icons-material/Book";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { UserContext } from "../context/Usercontext";
import { useLanguage } from "../context/languageContext";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { user, setUser } = useContext(UserContext);
  const language = useLanguage();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BookIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            style={{ backgroundColor: "transparent", border: 0 }}
            onClick={() => navigate("/")}
            variant="h6"
            noWrap
            component="button"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {language.Book}
          </Typography>

          <BookIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {cookies.token && (
              <MenuItem
                onClick={() => {
                  navigate("/addBook");
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  {language.AddBook}
                </Typography>
              </MenuItem>
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!cookies.token && (
              <MenuItem
                onClick={() => {
                  navigate("/login");
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  {language.Login}
                </Typography>
              </MenuItem>
            )}
            {!cookies.token && (
              <MenuItem
                onClick={() => {
                  navigate("/register");
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  {"Register"}
                </Typography>
              </MenuItem>
            )}
            {cookies.token && (
              <>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {user?.username}
                  </Typography>
                </Box>
                <MenuItem
                  onClick={() => {
                    removeCookie("token");
                    setUser && setUser(null);
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {language.Logout}
                  </Typography>
                </MenuItem>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
