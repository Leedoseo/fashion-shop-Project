import { useState, useCallback } from 'react';
import { ToastContext } from './toastContext';

/**
 * 토스트 알림을 전역으로 관리하는 Provider 컴포넌트
 *
 * - showToast(message, type): 화면 하단 중앙에 알림 메시지를 띄운다
 *   - type: 'success'(기본, 진한 회색) | 'error'(빨간색)
 *   - 3초 후 자동으로 사라진다
 * - 여러 토스트가 동시에 쌓일 수 있으며, 각자 독립적으로 사라진다
 * - 토스트 UI를 children 아래에 직접 렌더링하므로 별도 설치 불필요
 */
export const ToastProvider = ({ children }) => {
  // 현재 화면에 표시 중인 토스트 목록 (id, message, type)
  const [toasts, setToasts] = useState([]);

  // 새 토스트를 추가하고 3초 후 자동으로 제거
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now(); // 고유 id로 타임스탬프 사용
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      // 3초 후 해당 id의 토스트만 제거
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* 화면 하단 중앙에 고정된 토스트 컨테이너 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-6 py-3 rounded-lg text-white text-sm font-medium shadow-lg animate-fadeIn
              ${toast.type === 'success' ? 'bg-gray-800' : 'bg-red-500'}`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
