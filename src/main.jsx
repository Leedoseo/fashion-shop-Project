import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./contexts/CartContext.jsx";
import { WishlistProvider } from "./contexts/WishlistContext.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </ErrorBoundary>
  </StrictMode>,
);
