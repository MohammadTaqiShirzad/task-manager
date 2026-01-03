import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { AuthProvider } from "./utils/authContext.tsx";
import "react-loading-skeleton/dist/skeleton.css";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <AuthProvider>
     <App />
    </AuthProvider>
  </StrictMode>
);
