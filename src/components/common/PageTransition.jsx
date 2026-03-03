// 페이지 전환 시 fadeIn 애니메이션을 적용하는 래퍼 컴포넌트
// App.jsx에서 Routes를 감싸서 모든 페이지 진입에 부드러운 전환 효과를 준다
const PageTransition = ({ children }) => {
    return (
        <div className="animate-fadeIn">
            {children}
        </div>
    );
};

export default PageTransition;