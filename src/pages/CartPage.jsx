import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

/**
 * 장바구니 페이지 (/cart)
 * 담긴 상품 목록과 우측 주문 요약(금액, 배송비, 합계)을 함께 보여준다
 *
 * - 수량 +/- 버튼으로 개별 상품 수량 조절 (1 미만 방지는 CartContext에서 처리)
 * - ✕ 버튼으로 해당 상품을 장바구니에서 삭제
 * - 장바구니가 비어있으면 빈 상태 안내와 "쇼핑 계속하기" 버튼을 표시
 * - "주문하기" 버튼으로 /order 페이지로 이동
 */
const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

  // 장바구니가 비어있으면 빈 상태 화면 표시
  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg mb-6">장바구니가 비어있습니다.</p>
        <Link
          to="/products"
          className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          쇼핑 계속하기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">장바구니</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-lg p-4 flex items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain bg-gray-50 rounded p-1"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-400 capitalize">{item.category}</p>
                <p className="text-gray-800 font-medium line-clamp-1">{item.title}</p>
                <p className="text-gray-900 font-bold mt-1">${item.price}</p>
              </div>

              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1 text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors text-lg"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4">주문 요약</h2>
          <div className="flex justify-between mb-2 text-gray-600">
            <span>상품 금액</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-gray-600">
            <span>배송비</span>
            <span className="text-green-500">무료</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-gray-800 text-lg">
            <span>총 결제금액</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Link
            to="/order"
            className="block mt-6 bg-gray-800 text-white text-center py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            주문하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;