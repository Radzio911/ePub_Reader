import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CookiesProvider } from "react-cookie";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

body{
margin: 0;



}




`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyles />
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </StrictMode>
);
