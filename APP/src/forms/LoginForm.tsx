import React, { useEffect, useState, type BaseSyntheticEvent } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import useApi from "../api";
import { useCookies } from "react-cookie";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 300px;
`;

export default function LoginForm({ onLogin = () => {} }: any) {
  const api = useApi();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token) {
      onLogin();
    }
  }, [cookies.token]);

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    api.post("/login", JSON.stringify({ username, password })).then((data) => {
      if (data.data.loginin) {
        setCookie("token", data.data.token);
      }
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Typography variant="h5">LoginForm</Typography>
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
