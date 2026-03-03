import { Component } from 'react';

/**
 * React 렌더링 중 발생하는 예외를 잡아 앱 전체가 흰 화면이 되는 것을 방지하는 컴포넌트
 * 함수형 컴포넌트에서는 구현 불가능하므로 클래스형 컴포넌트로 작성되었다
 *
 * - hasError: 에러 발생 여부 상태
 * - getDerivedStateFromError: 하위 트리에서 에러 발생 시 hasError를 true로 전환
 * - componentDidCatch: 에러 정보를 콘솔에 출력 (추후 에러 모니터링 서비스 연동 가능)
 * - 에러 발생 시 "다시 시도" 버튼으로 hasError를 false로 리셋해 재렌더링 시도
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    // 하위 컴포넌트에서 에러 발생 시 state를 업데이트해 에러 화면으로 전환
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    // 에러 상세 정보를 콘솔에 기록 (디버깅 및 모니터링 용도)
    componentDidCatch(error, info) {
        console.error('ErrorBoundaryt caught:', error, info);
    }

    render() {
        if (this.state.hasError) {
            // 에러 발생 시 보여주는 폴백(fallback) UI
            return (
                <div className='flex flex-col items-center justify-center py-20 gap-4'>
                    <p className='text-5xl'>문제 발생</p>
                    <h2 className='text-2xl font-bold text-gray-800'>문제가 발생했습니다.</h2>
                    <p className='text-gray-500'>잠시 후 다시 시도해주세요.</p>
                    {/* hasError를 false로 리셋해 컴포넌트 재렌더링 시도 */}
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className='bg-gray-800 text-white px-6 py-3 rounded-lg hober:bg-gray-700 transition-colors'
                        >
                            다시 시도
                        </button>
                </div>
            );
        }
        // 정상 상태에서는 자식 컴포넌트를 그대로 렌더링
        return this.props.children;
    }
}

export default ErrorBoundary