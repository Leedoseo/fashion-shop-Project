import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg=white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Fashion Shop
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/products" className="text-gray-600 hover:text-gray-900">
            상품목록
          </Link>

          <Link to="/wishlist" className="text-gray-600 hover:text-gray-900">
            찜목록
          </Link>

          <Link to="cart" className="text-gray-600 hover:text-gray-900">
            장바구니
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
