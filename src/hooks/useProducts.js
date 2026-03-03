import { useState, useEffect } from 'react';
import { getProducts, getProductsByCategory } from '../api/products';

const useProducts = (category = 'all') => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try{
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
    }, [category]);

    return { products, loading, error };
};

export default useProducts;