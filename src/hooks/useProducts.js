import { useState, useEffect } from 'react';
import { getProducts, getProductsByCategory } from '../api/products';

/**
 * 상품 목록을 가져오는 커스텀 훅
 * category가 'all'이면 전체 상품을, 특정 카테고리명이면 해당 카테고리 상품만 가져온다
 * category가 바뀔 때마다 자동으로 재요청한다
 *
 * @param {string} category - 'all' 또는 카테고리명 (기본값: 'all')
 * @returns {{ products, loading, error }}
 */
const useProducts = (category = 'all') => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try{
                // 'all'이면 전체 상품, 아니면 카테고리별 상품을 요청
                const data =
                    category === 'all'
                        ? await getProducts()
                        : await getProductsByCategory(category);
                    setProducts(data);
            } catch {
                setError('상품을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category]); // category가 바뀔 때마다 재요청

    return { products, loading, error };
};

export default useProducts;