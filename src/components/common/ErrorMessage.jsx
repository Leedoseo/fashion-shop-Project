const ErrorMessage = ({ message }) => {
    return (
        <div className="flex justify-center items-center py-20">
            <p className="text-red-500 text-lg">{message}</p>
        </div>
    );
};

export default ErrorMessage;