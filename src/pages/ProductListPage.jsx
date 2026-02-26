import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, getProductsByCategory } from "../api/products";
import ProductCard from "../components/common/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

const CATEGORIES = [
  "all",
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics",
];

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data =
          currentCategory === "all"
            ? await getProducts()
            : await getProductsByCategory(currentCategory);
        setProducts(data);
      } catch {
        setError("상품을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentCategory]);

  const handleCategoryChange = (category) => {
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">상품 목록</h1>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize
              ${
                currentCategory === category
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {category === "all" ? "전체" : category}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <p className="text-sm textg-gray-500 mb-4">
            {products.length}개 상품
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListPage;
