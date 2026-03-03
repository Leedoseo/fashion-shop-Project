import { memo } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = memo(({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="h-48 flex items-center justify-center p-4 bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-400 mb-1 uppercase">{product.category}</p>
          <h3 className="text-sm text-gray-800 font-medium line-clamp-2 mb-2">
            {product.title}
          </h3>
          <p className="text-gray-900 font-bold">${product.price}</p>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;