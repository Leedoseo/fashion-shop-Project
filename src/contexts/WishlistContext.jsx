import { useState, useEffect, useCallback } from 'react';
import { WishlistContext } from './wishlistContext';

/**
 * 찜 목록(위시리스트) 전역 상태를 관리하는 Provider 컴포넌트
 *
 * - wishlist: localStorage에서 초기값을 불러와 새로고침 후에도 데이터 유지
 * - toggleWishlist: 이미 찜한 상품이면 삭제, 아니면 추가 (토글)
 * - isWishlisted: 특정 상품 ID가 찜 목록에 있는지 여부를 반환
 * - removeFromWishlist: 특정 상품을 찜 목록에서 삭제
 */
export const WishlistProvider = ({ children }) => {
  // localStorage에서 저장된 위시리스트 데이터를 초기값으로 불러온다
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // wishlist가 변경될 때마다 localStorage에 자동 저장
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // 찜 목록에 상품 추가
  const addToWishlist = useCallback((product) => {
    setWishlist((prev) => [...prev, product]);
  }, []);

  // 찜 목록에서 특정 상품 제거
  const removeFromWishlist = useCallback((id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // 특정 상품 ID가 찜 목록에 있는지 확인 (하트 아이콘 활성화 여부에 사용)
  const isWishlisted = useCallback((id) => {
    return wishlist.some((item) => item.id === id);
  }, [wishlist]);

  // 찜 상태 토글: 이미 찜한 상품이면 삭제, 아니면 추가
  const toggleWishlist = useCallback((product) => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }, [isWishlisted, removeFromWishlist, addToWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};