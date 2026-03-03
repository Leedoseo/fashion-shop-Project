/**
 * 데이터 로딩 중에 표시하는 스피너 컴포넌트
 *
 * @param {boolean} fullScreen - true이면 화면 전체를 반투명 오버레이로 덮고 중앙에 표시,
 *                               false(기본값)이면 컨텐츠 영역 내에서 중앙 정렬로 표시
 */
const LoadingSpinner = ({ fullScreen = false }) => {
  // fullScreen 모드: 화면 전체를 반투명 흰 배경으로 덮은 뒤 스피너를 가운데 표시
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-800"></div>
      </div>
    );
  }

  // 일반 모드: 컨텐츠 영역 내에서 세로 여백을 두고 중앙에 표시
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
    </div>
  );
};

export default LoadingSpinner;