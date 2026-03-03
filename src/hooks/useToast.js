import { useContext } from 'react';
import { ToastContext } from '../contexts/toastContext';

/**
 * 토스트 알림 Context를 쉽게 사용하기 위한 커스텀 훅
 * ToastProvider 하위 컴포넌트에서만 사용 가능하며,
 * 그 외 위치에서 호출하면 에러를 발생시켜 잘못된 사용을 방지한다
 */
const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};

export default useToast;