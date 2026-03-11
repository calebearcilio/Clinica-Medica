import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ptBR } from "@mui/material/locale";
import PopupProvider from "./components/messages/PopupProvider.tsx";

const theme = createTheme({}, ptBR);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PopupProvider>
        <App />
      </PopupProvider>
    </ThemeProvider>
  </StrictMode>,
);
