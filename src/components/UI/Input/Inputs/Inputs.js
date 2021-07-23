import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import classes from "./Inputs.css";

const Inputs = ({
	inputType,
	id,
	handleChange,
	config,
	invalid,
	touched,
	obs,
	mindate,
	inputUpdateData,
	showLabel,
	companyTextareaDescription,
	jobTextareaDescription,
	placeholder,
}) => {
	const { labelText, type, helperText, rows, max, multiple } = { ...config };

	const InputClasses = [classes.Span];

	let textareaValue = "";

	const label =
		showLabel && inputUpdateData === undefined ? (
			<label htmlFor={id}>{labelText}</label>
		) : null;

	if (obs) {
		textareaValue = obs;
	} else if (companyTextareaDescription) {
		textareaValue = companyTextareaDescription;
	} else {
		textareaValue = jobTextareaDescription;
	}

	if (invalid && touched) {
		InputClasses.push(classes.Invalid);
	}

	switch (inputType) {
		case "input":
			return (
				<div className="input-field">
					{label}
					<input
						className={InputClasses.join(" ")}
						type={type}
						id={id}
						min={mindate}
						max={max}
						multiple={multiple}
						placeholder={placeholder}
						defaultValue={inputUpdateData}
						onChange={handleChange}
					/>
					<span className={InputClasses.join(" ")}>{helperText}</span>
				</div>
			);

		case "textarea":
			return (
				<div>
					<label htmlFor={id}>{labelText}</label>
					<TextareaAutosize
						className="materialize-textarea"
						id={id}
						defaultValue={textareaValue}
						rowsMin={rows}
						rowsMax={5}
						onChange={handleChange}
					></TextareaAutosize>
				</div>
			);

		default:
			return (
				<div className="input-field">
					{label}
					<input
						className={InputClasses.join(" ")}
						type={type}
						id={id}
						min={mindate}
						max={max}
						placeholder={placeholder}
						defaultValue={inputUpdateData}
						onChange={handleChange}
					/>
				</div>
			);
	}
};

export default Inputs;
