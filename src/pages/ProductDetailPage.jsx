import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import useToast from "../hooks/useToast";

/**
 * 상품 상세 페이지 (/products/:id)
 * URL 파라미터의 id로 단일 상품 데이터를 불러와 이미지, 정보, 리뷰 평점을 표시한다
 *
 * - 수량 선택 후 "장바구니 담기" 버튼으로 장바구니에 추가 (토스트 알림 포함)
 * - 하트 버튼으로 찜 상태를 토글 (찜 추가/삭제 시 각각 토스트 알림 표시)
 * - 뒤로가기 버튼: navigate(-1)로 이전 페이지로 복귀
 */
const ProductDetailPage = () => {
  const { id } = useParams();          // URL 파라미터에서 상품 ID 추출
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const [quantity, setQuantity] = useState(1); // 장바구니 담을 수량 (최소 1)
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  // 선택한 수량과 함께 장바구니에 추가하고 토스트 알림 표시
  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast("장바구니에 추가됐습니다 🛒");
  };

  // 찜 상태 토글 후 현재 상태에 맞는 토스트 메시지 표시
  // toggleWishlist 호출 전 isWishlisted로 현재 상태를 먼저 확인
  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (isWishlisted(product.id)) {
      showToast("찜 목록에서 삭제됐습니다");
    } else {
      showToast("찜 목록에 추가됐습니다 ❤️");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 hover:text-gray-800 mb-8 flex items-center gap-1"
      >
        ← 뒤로가기
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center h-96">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-400 uppercase">{product.category}</p>
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>

          <div className="flex items-center gap-2">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">
              {product.rating.rate} ({product.rating.count}개 리뷰)
            </span>
          </div>

          <p className="text-3xl font-bold text-gray-900">${product.price}</p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">수량</span>
            <div className="flex items-center border rounded-lg overflow-hidden">
              {/* Math.max(1, q-1)로 수량이 1 미만으로 내려가지 않도록 방지 */}
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-lg"
              >
                -
              </button>
              <span className="px-6 py-2 text-gray-800 font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-lg"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              장바구니 담기
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`px-6 py-3 border rounded-lg transition-colors text-xl
                ${
                  isWishlisted(product.id)
                    ? "border-red-400 text-red-500 bg-red-50"
                    : "border-gray-300 text-gray-400 hover:bg-gray-50"
                }`}
            >
              {isWishlisted(product.id) ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
