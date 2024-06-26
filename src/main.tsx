import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";
import { MovieProvider } from "./context/MovieContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ModalProvider>
    <MovieProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MovieProvider>
  </ModalProvider>
);
