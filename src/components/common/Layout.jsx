import Header from "./Header";
import Footer from "./Footer";

/**
 * 모든 페이지에 공통으로 적용되는 레이아웃 컴포넌트
 * Header - 페이지 콘텐츠 - Footer 구조를 유지하며,
 * main 영역이 flex-1을 가져 콘텐츠가 짧아도 Footer가 항상 하단에 위치한다
 */
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;