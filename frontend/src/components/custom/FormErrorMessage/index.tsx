interface IFormErrorMessageProps {
	message?: string;
	className?: string;
}

const FormErrorMessage: React.FC<IFormErrorMessageProps> = ({
	message,
	className,
}) => {
	if (!message) return <></>;

	return <p className={`text-red-600 text-xs mt-1 ${className}`}>{message}</p>;
};

export default FormErrorMessage;
