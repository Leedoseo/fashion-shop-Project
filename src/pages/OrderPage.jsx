import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

const OrderPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    detailAddress: "",
    paymentMethod: "card",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderComplete(true);
    clearCart();
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg mb-6">장바구니가 비어있습니다.</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          쇼핑 계속하기
        </button>
      </div>
    );
  }

  // 주문 완료 화면
  if (orderComplete) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          주문이 완료되었습니다!
        </h2>
        <p className="text-gray-500 mb-8">주문해주셔서 감사합니다.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">주문/결제</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 주문 폼 */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          {/* 배송지 입력 */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              배송지 정보
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  받는 분
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="이름을 입력하세요"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  연락처
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="010-0000-0000"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">주소</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="주소를 입력하세요"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  상세 주소
                </label>
                <input
                  type="text"
                  name="detailAddress"
                  value={form.detailAddress}
                  onChange={handleChange}
                  placeholder="상세 주소를 입력하세요"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>
          </div>

          {/* 결제 수단 */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">결제 수단</h2>
            <div className="flex flex-col gap-3">
              {[
                { value: "card", label: "신용/체크카드" },
                { value: "transfer", label: "계좌이체" },
                { value: "phone", label: "휴대폰 결제" },
              ].map((method) => (
                <label
                  key={method.value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={form.paymentMethod === method.value}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-4 rounded-lg hover:bg-gray-700 transition-colors font-bold text-lg"
          >
            ${totalPrice.toFixed(2)} 결제하기
          </button>
        </form>

        {/* 주문 상품 요약 */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4">주문 상품</h2>
          <div className="flex flex-col gap-3 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 object-contain bg-white rounded p-1"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400">수량: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-gray-800">
            <span>총 결제금액</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
