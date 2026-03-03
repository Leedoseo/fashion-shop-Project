import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import PageTransition from "./components/common/PageTransition";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import OrderPage from "./pages/OrderPage";


const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </PageTransition>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
