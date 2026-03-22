import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ptBR } from "@mui/material/locale";
import PopupProvider from "./components/messages/PopupProvider.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const theme = createTheme({}, ptBR);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PopupProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </PopupProvider>
    </ThemeProvider>
  </StrictMode>,
);
