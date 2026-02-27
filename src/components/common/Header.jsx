import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const Header = () => {
  const { totalCount } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
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
          <Link to="/cart" className="relative text-gray-600 hover:text-gray-900">
            장바구니
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;