import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

const Header = () => {
  const { totalCount } = useCart();
  const { wishlist } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery.trim()}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* 로고 */}
          <Link to="/" className="text-2xl font-bold text-gray-800 shrink-0">
            Fashion Shop
          </Link>

          {/* 검색창 (데스크탑) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md"
          >
            <input
              type="text"
              placeholder="상품 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-500"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-700 transition-colors text-sm"
            >
              검색
            </button>
          </form>

          {/* 네비게이션 (데스크탑) */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/products"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              상품목록
            </Link>
            <Link
              to="/wishlist"
              className="relative text-gray-600 hover:text-gray-900 text-sm"
            >
              찜목록
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-gray-900 text-sm"
            >
              장바구니
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </Link>
          </nav>

          {/* 햄버거 버튼 (모바일) */}
          <button
            className="md:hidden text-gray-600 text-2xl"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 pb-4 border-t pt-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="상품 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-500"
              />
              <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-700 transition-colors text-sm"
              >
                검색
              </button>
            </form>
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              상품목록
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              찜목록 {wishlist.length > 0 && `(${wishlist.length})`}
            </Link>
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              장바구니 {totalCount > 0 && `(${totalCount})`}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
