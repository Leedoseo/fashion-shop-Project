import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/common/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

/**
 * 쇼핑몰 메인 홈 페이지
 * 카테고리 바로가기, 베스트 상품(상위 4개), 신상품(5~8번째)을 보여준다
 * 카테고리 클릭 시 /products?category=카테고리명 으로 이동한다
 */
const HomePage = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  // API 응답 순서 기준: 앞 4개를 베스트, 5~8번째를 신상품으로 사용
  const bestProducts = products.slice(0, 4);
  const newProducts = products.slice(4, 8);
  // 중복 없는 카테고리 목록 추출
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">카테고리</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${category}`}
              className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg p-6 text-center text-gray-700 font-medium capitalize"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">베스트 상품</h2>
          <Link to="/products" className="text-sm text-gray-500 hover:text-gray-800">
            전체보기 →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">신상품</h2>
          <Link to="/products" className="text-sm text-gray-500 hover:text-gray-800">
            전체보기 →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;