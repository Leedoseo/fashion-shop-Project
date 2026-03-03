import { useContext } from 'react';
import { CartContext } from '../contexts/cartContext';

/**
 * 장바구니 Context를 쉽게 사용하기 위한 커스텀 훅
 * CartProvider 하위 컴포넌트에서만 사용 가능하며,
 * 그 외 위치에서 호출하면 에러를 발생시켜 잘못된 사용을 방지한다
 */
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export default useCart;