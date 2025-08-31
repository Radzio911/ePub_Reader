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
import { UserContext } from "../userContext/Usercontext";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { user } = useContext(UserContext);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BookIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            BOOK
          </Typography>

          <BookIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BOOK
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {cookies.token && (
              <MenuItem
                onClick={() => {
                  navigate("/addBook");
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  {"Add Book"}
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
                <Typography sx={{ textAlign: "center" }}>{"Login"}</Typography>
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
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {"Logout"}
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
