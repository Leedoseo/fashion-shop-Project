import { useContext } from 'react';
import { WishlistContext } from '../contexts/wishlistContext';

/*
 * 찜 목록 Context를 쉽게 사용하기 위한 커스텀 훅
 * WishlistProvider 하위 컴포넌트에서만 사용 가능하며,
 * 그 외 위치에서 호출하면 에러를 발생시켜 잘못된 사용을 방지한다
 */
const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) throw new Error('useWishlist must be used within WishlistProvider');
    return context;
};

export default useWishlist;