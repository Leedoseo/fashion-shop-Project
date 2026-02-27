import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/products";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        setError("상품을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 뒤로가기 */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 hover:text-gray-800 mb-8 flex items-center gap-1"
      >
        ← 뒤로가기
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 상품 이미지 */}
        <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center h-96">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>

        {/* 상품 정보 */}
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-400 uppercase">{product.category}</p>
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>

          {/* 평점 */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">
              {product.rating.rate} ({product.rating.count}개 리뷰)
            </span>
          </div>

          <p className="text-3xl font-bold text-gray-900">${product.price}</p>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* 수량 선택 */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">수량</span>
            <div className="flex items-center border rounded-lg overflow-hidden">
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

          {/* 버튼 */}
          <div className="flex gap-3 mt-4">
            <button className="flex-1 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium">
              장바구니 담기
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              ♡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
