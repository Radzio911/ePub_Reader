import React, {
  useContext,
  useEffect,
  useState,
  type BaseSyntheticEvent,
} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import useApi from "../api";
import { useCookies } from "react-cookie";
import { UserContext } from "../userContext/Usercontext";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  width: 300px;
`;

export default function LoginForm({ onLogin = () => {} }: any) {
  const api = useApi();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (cookies.token) {
      onLogin();
    }
  }, [cookies.token]);

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    api.post("/login", JSON.stringify({ username, password })).then((data) => {
      if (data.data.loginin) {
        setUser && setUser(data.data.user);
        setCookie("token", data.data.token);
      }
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Typography align="center" variant="h5">
        LoginForm
      </Typography>
      <TextField
        variant="filled"
        label="Username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      ></TextField>
      <TextField
        variant="filled"
        label="Password"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      ></TextField>
      <Button variant="contained" type="submit">
        Login
      </Button>
    </StyledForm>
  );
}
