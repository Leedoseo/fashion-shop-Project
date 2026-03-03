import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/common/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

// 상단 필터 버튼에 표시할 카테고리 목록 (FakeStore API 카테고리와 일치)
const CATEGORIES = [
  "all",
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics",
];

// 정렬 드롭다운에 표시할 옵션 목록
const SORT_OPTIONS = [
  { value: "default", label: "기본순" },
  { value: "price_asc", label: "가격 낮은순" },
  { value: "price_desc", label: "가격 높은순" },
  { value: "rating", label: "인기순" },
];

/**
 * 상품 목록 페이지
 * URL 쿼리스트링(category, search)을 기반으로 상품을 불러오고,
 * 검색어 / 가격 범위 / 정렬을 클라이언트 사이드에서 추가 필터링한다
 *
 * - ?category=electronics  → 전자제품만 표시
 * - ?search=jacket         → "jacket"이 포함된 상품만 표시
 * - 카테고리 변경 시 URL 쿼리스트링을 업데이트해 상태를 URL에 동기화
 */
const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "all"; // URL에서 카테고리 읽기
  const searchFromUrl = searchParams.get("search") || "";         // URL에서 검색어 읽기
  const { products, loading, error } = useProducts(currentCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // Header 검색창에서 넘어온 URL 검색어를 로컬 state에 반영
  useEffect(() => {
    setSearchQuery(searchFromUrl);
  }, [searchFromUrl]);

  // 카테고리 버튼 클릭 시 URL 쿼리스트링 업데이트 (전체 선택 시 쿼리스트링 제거)
  const handleCategoryChange = (category) => {
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  // 검색어 · 가격 범위 · 정렬 옵션을 한 번에 적용
  // 의존값이 바뀔 때만 재계산 (useMemo로 성능 최적화)
  const filteredProducts = useMemo(() => {
    return products
      // 1단계: 검색어 필터 (대소문자 무시)
      .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
      // 2단계: 가격 범위 필터 (미입력 시 min=0, max=Infinity로 처리)
      .filter((p) => {
        const min = priceRange.min === "" ? 0 : Number(priceRange.min);
        const max = priceRange.max === "" ? Infinity : Number(priceRange.max);
        return p.price >= min && p.price <= max;
      })
      // 3단계: 정렬
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating.rate - a.rating.rate;
        return 0; // "default"는 API 응답 순서 유지
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
