import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

/**
 * 상단 고정 헤더 컴포넌트 (sticky)
 *
 * - 로고, 검색창, 네비게이션(상품목록 / 찜목록 / 장바구니)을 포함
 * - 찜목록/장바구니 링크에는 현재 개수가 빨간 뱃지로 표시된다
 * - 모바일에서는 햄버거 버튼으로 접이식 메뉴를 열고 닫는다
 * - 검색 제출 시 /products?search=검색어 로 이동하고 입력창을 초기화
 */
const Header = () => {
  const { totalCount } = useCart();         // 장바구니 전체 수량 (뱃지 표시용)
  const { wishlist } = useWishlist();       // 찜 목록 배열 (뱃지 표시용)
  const [menuOpen, setMenuOpen] = useState(false);    // 모바일 메뉴 열림 상태
  const [searchQuery, setSearchQuery] = useState(""); // 검색 입력값
  const navigate = useNavigate();

  // 검색 폼 제출 핸들러: 공백만 입력된 경우 무시
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 검색어를 URL 쿼리스트링으로 전달해 ProductListPage에서 필터링
      navigate(`/products?search=${searchQuery.trim()}`);
      setSearchQuery("");
      setMenuOpen(false); // 모바일 메뉴가 열려있으면 닫기
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
