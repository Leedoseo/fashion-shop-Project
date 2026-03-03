// API 요청 실패 등 에러 상황에서 화면 중앙에 빨간색 메시지를 표시하는 컴포넌트
const ErrorMessage = ({ message }) => {
    return (
        <div className="flex justify-center items-center py-20">
            <p className="text-red-500 text-lg">{message}</p>
        </div>
    );
};

export default ErrorMessage;