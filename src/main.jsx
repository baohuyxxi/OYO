import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import "./assets/css/grid.scss";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  ThemeProvider,
} from "@mui/material/styles";
import theme from "./theme";
import LocateProvider, { LocateContext } from "./contexts/LocateContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LocateProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssVarsProvider theme={theme}>
              <I18nextProvider i18n={i18n}>
                <CssBaseline />
                <SnackbarProvider
                  maxSnack={3}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  style={{ fontSize: "14px" }}
                >
                  <App />
                </SnackbarProvider>
              </I18nextProvider>
            </CssVarsProvider>
          </ThemeProvider>
        </AuthProvider>
      </LocateProvider>
    </BrowserRouter>
  </React.StrictMode>
);
