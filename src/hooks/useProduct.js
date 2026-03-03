import { useState, useEffect } from 'react';
import { getProductById } from '../api/products';

/**
 * 특정 상품 ID에 해당하는 단일 상품 데이터를 가져오는 커스텀 훅
 * id가 바뀔 때마다 자동으로 재요청한다
 *
 * @param {string|number} id - 조회할 상품 ID
 * @returns {{ product, loading, error }}
 */
const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        setError('상품을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]); // id가 바뀔 때마다 재요청

  return { product, loading, error };
};

export default useProduct;