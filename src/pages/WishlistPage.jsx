import { Link } from "react-router-dom";
import useWishlist from "../hooks/useWishlist";
import useCart from "../hooks/useCart";

/**
 * 찜 목록 페이지 (/wishlist)
 * 찜한 상품을 그리드 형태로 나열한다
 *
 * - 상품 카드 클릭 시 상품 상세 페이지로 이동
 * - "장바구니" 버튼으로 해당 상품을 수량 1로 장바구니에 추가
 * - ✕ 버튼으로 찜 목록에서 삭제
 * - 찜 목록이 비어있으면 빈 상태 안내와 "쇼핑 계속하기" 버튼을 표시
 */
const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // 찜 목록이 비어있으면 빈 상태 화면 표시
  if (wishlist.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg mb-6">찜한 상품이 없습니다.</p>
        <Link
          to="/products"
          className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          쇼핑 계속하기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">찜 목록</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <Link to={`/products/${item.id}`}>
              <div className="h-48 flex items-center justify-center p-4 bg-gray-50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full object-contain"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 mb-1 uppercase">
                  {item.category}
                </p>
                <h3 className="text-sm text-gray-800 font-medium line-clamp-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-900 font-bold">${item.price}</p>
              </div>
            </Link>
            <div className="px-4 pb-4 flex gap-2">
              <button
                onClick={() => addToCart(item)}
                className="flex-1 bg-gray-800 text-white py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
              >
                장바구니
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-400 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
