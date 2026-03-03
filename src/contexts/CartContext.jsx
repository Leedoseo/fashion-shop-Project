import { useState, useEffect, useCallback } from "react";
import { CartContext } from "./cartContext";

/**
 * 장바구니 전역 상태를 관리하는 Provider 컴포넌트
 *
 * - cartItems: localStorage에서 초기값을 불러와 새로고침 후에도 데이터 유지
 * - addToCart: 이미 담긴 상품이면 수량만 증가, 새 상품이면 배열에 추가
 * - updateQuantity: 수량이 1 미만이 되면 무시 (최소 수량 1 보장)
 * - removeFromCart: 특정 상품을 장바구니에서 제거
 * - clearCart: 장바구니 전체 비우기 (주문 완료 후 호출)
 * - totalPrice: 모든 상품의 (가격 × 수량) 합산
 * - totalCount: 모든 상품의 수량 합산 (헤더 뱃지에 표시)
 */
export const CartProvider = ({ children }) => {
  // localStorage에서 저장된 장바구니 데이터를 초기값으로 불러온다
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // cartItems가 변경될 때마다 localStorage에 자동 저장
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 상품을 장바구니에 추가 (이미 있으면 수량 증가)
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // 이미 담긴 상품이면 수량만 더한다
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      // 새 상품이면 배열 끝에 추가
      return [...prev, { ...product, quantity }];
    });
  }, []);

  // 특정 상품의 수량을 변경 (1 미만으로 내려가지 않도록 방지)
  const updateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }, []);

  // 특정 상품을 장바구니에서 삭제
  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // 장바구니를 완전히 비운다 (주문 완료 시 사용)
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // 전체 결제 금액: 각 상품의 (가격 × 수량) 합산
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // 전체 상품 수량 합산 (헤더의 장바구니 뱃지 숫자에 사용)
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
