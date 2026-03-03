import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
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

const SORT_OPTIONS = [
  { value: "default", label: "기본순" },
  { value: "price_asc", label: "가격 낮은순" },
  { value: "price_desc", label: "가격 높은순" },
  { value: "rating", label: "인기순" },
];

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";
  const searchFromUrl = searchParams.get("search") || "";
  const { products, loading, error } = useProducts(currentCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // URL 검색어 동기화
  useEffect(() => {
    setSearchQuery(searchFromUrl);
  }, [searchFromUrl]);

  const handleCategoryChange = (category) => {
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  // 검색 + 필터 + 정렬 적용
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter((p) => {
        const min = priceRange.min === "" ? 0 : Number(priceRange.min);
        const max = priceRange.max === "" ? Infinity : Number(priceRange.max);
        return p.price >= min && p.price <= max;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating.rate - a.rating.rate;
        return 0;
      });
  }, [products, searchQuery, priceRange, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">상품 목록</h1>

      {/* 검색창 */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="상품명을 검색하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-500"
        />
      </div>

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

      {/* 가격 필터 & 정렬 */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="최소 가격"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, min: e.target.value }))
            }
            className="w-28 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
          />
          <span className="text-gray-400">~</span>
          <input
            type="number"
            placeholder="최대 가격"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, max: e.target.value }))
            }
            className="w-28 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {filteredProducts.length}개 상품
          </p>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListPage;
