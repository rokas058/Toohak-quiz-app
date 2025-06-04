import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@assets/styles/global.css";
import App from "./App.tsx";
import "./i18next.config.js";
import { Auth0Provider } from "@auth0/auth0-react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import theme from "@assets/styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ErrorBoundary from "@components/ErrorBoundary";
import { AuthProvider } from "@contexts/AuthProvider.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionRejoinProvider } from "@contexts/SessionRejoinProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: "openid offline_access profile email",
        }}
        useRefreshTokens
        cacheLocation="localstorage"
      >
        <AuthProvider>
          <CookiesProvider>
            <BrowserRouter>
              <React.Suspense fallback="loading">
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <ErrorBoundary>
                    <SessionRejoinProvider>
                      <App />
                    </SessionRejoinProvider>
                    <ToastContainer />
                  </ErrorBoundary>
                </ThemeProvider>
              </React.Suspense>
            </BrowserRouter>
          </CookiesProvider>
        </AuthProvider>
      </Auth0Provider>
    </QueryClientProvider>
  </StrictMode>,
);
