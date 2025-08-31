import styled, { ThemeProvider } from "styled-components";
import NavBar from "../components/NavBar";
import { UserContext } from "../userContext/Usercontext";
import { useEffect, useState } from "react";
import useApi from "../api";
import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 64px);
  justify-content: center;
`;

type TemplateProps = { children: any };

export default function Template({ children, ...props }: TemplateProps) {
  const [user, setUser] = useState<any>({});
  const api = useApi();
  useEffect(() => {
    api.get("/user").then((data) => {
      setUser(data.data.user);
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavBar></NavBar>
      <StyledContent>{children}</StyledContent>
    </UserContext.Provider>
  );
}
