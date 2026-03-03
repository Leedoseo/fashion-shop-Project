import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundaryt caught:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className='flex flex-col items-center justify-center py-20 gap-4'>
                    <p className='text-5xl'>문제 발생</p>
                    <h2 className='text-2xl font-bold text-gray-800'>문제가 발생했습니다.</h2>
                    <p className='text-gray-500'>잠시 후 다시 시도해주세요.</p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className='bg-gray-800 text-white px-6 py-3 rounded-lg hober:bg-gray-700 transition-colors'
                        >
                            다시 시도
                        </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary