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

export default function RegisterForm({ onRegister = () => {} }: any) {
  const api = useApi();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    api
      .post("/register", JSON.stringify({ username, password, email }))
      .then((data) => {
        if (data.data.id) {
          onRegister();
        }
      });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Typography variant="h5">RegisterForm</Typography>
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
      <TextField
        variant="filled"
        label="Email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      ></TextField>
      <Button variant="contained" type="submit">
        Register
      </Button>
    </StyledForm>
  );
}
