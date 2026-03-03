import { memo } from 'react';
import { Link } from 'react-router-dom';

/**
 * 상품 목록에서 개별 상품을 카드 형태로 표시하는 컴포넌트
 * 클릭하면 해당 상품 상세 페이지(/products/:id)로 이동한다
 *
 * memo로 감싸서 product props가 바뀌지 않으면 불필요한 리렌더링을 방지한다
 */
const ProductCard = memo(({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 overflow-hidden">
        {/* 상품 이미지 영역: 비율이 다른 이미지도 균일하게 보이도록 object-contain 사용 */}
        <div className="h-48 flex items-center justify-center p-4 bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-400 mb-1 uppercase">{product.category}</p>
          {/* 긴 상품명은 2줄로 제한하고 말줄임표 처리 */}
          <h3 className="text-sm text-gray-800 font-medium line-clamp-2 mb-2">
            {product.title}
          </h3>
          <p className="text-gray-900 font-bold">${product.price}</p>
        </div>
      </div>
    </Link>
  );
});

// React DevTools에서 컴포넌트 이름이 'memo'가 아닌 'ProductCard'로 표시되도록 설정
ProductCard.displayName = 'ProductCard';

export default ProductCard;