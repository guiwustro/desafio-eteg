import { FieldValues, UseFormRegister, Path } from "react-hook-form";
import FormErrorMessage from "../FormErrorMessage";

interface FormGroupProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	registerName: Path<T>;
	type: React.HTMLInputTypeAttribute;
	label: string;
	placeholder?: string;
	messageError?: string;
	classNameError?: string;
	autoComplete?: React.HTMLInputAutoCompleteAttribute;
}

const FormGroup = <T extends FieldValues>({
	label,
	type,
	registerName,
	register,
	placeholder,
	messageError,
	classNameError,
	autoComplete,
}: FormGroupProps<T>) => {
	return (
		<div className="mb-4">
			<label
				className="text-sm font-medium text-textPrimary"
				htmlFor={registerName}
			>
				{label}
			</label>
			<input
				id={registerName}
				type={type}
				autoComplete={autoComplete}
				{...register(registerName)}
				placeholder={placeholder}
				className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2  focus:outline-none ${
					messageError ? "border-red-500" : "border-border focus:border-primary"
				}`}
			/>
			<FormErrorMessage message={messageError} className={classNameError} />
		</div>
	);
};

export default FormGroup;
