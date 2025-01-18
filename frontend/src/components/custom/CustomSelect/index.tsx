import { colorOptions } from "@/constants/colorOptions";
import chroma from "chroma-js";

import Select, { MultiValue, SingleValue, StylesConfig } from "react-select";

interface ColorOption {
	value: string;
	label: string;
}

interface CustomSelectProps {
	value: ColorOption;
	onChange: (
		selectedOption: SingleValue<ColorOption> | MultiValue<ColorOption>
	) => void;
}

const dot = (color = "transparent") => ({
	alignItems: "center",
	display: "flex",

	":before": {
		backgroundColor: color,
		borderRadius: 10,
		content: '" "',
		display: "block",
		marginRight: 8,
		height: 10,
		width: 10,
	},
});

// source: https://codesandbox.io/p/sandbox/36z4qw
const colourStyles: StylesConfig<ColorOption> = {
	control: (styles) => ({ ...styles, backgroundColor: "white" }),
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		if (data.value == "") return { ...styles };

		const color = chroma(data.value);
		return {
			...styles,
			backgroundColor: isDisabled
				? undefined
				: isSelected
				? data.value
				: isFocused
				? color.alpha(0.1).css()
				: undefined,
			color: isDisabled
				? "#ccc"
				: isSelected
				? chroma.contrast(color, "white") > 2
					? "white"
					: "black"
				: "black",
			cursor: isDisabled ? "not-allowed" : "default",

			":active": {
				...styles[":active"],
				backgroundColor: !isDisabled
					? isSelected
						? data.value
						: color.alpha(0.3).css()
					: undefined,
			},
		};
	},
	input: (styles) => ({ ...styles, ...dot() }),
	placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
	singleValue: (styles, { data }) => ({ ...styles, ...dot(data.value) }),
};

export const CustomSelect = ({ value, onChange }: CustomSelectProps) => (
	<Select
		value={value}
		onChange={onChange}
		defaultValue={colorOptions[0]}
		options={colorOptions}
		styles={colourStyles}
	/>
);
