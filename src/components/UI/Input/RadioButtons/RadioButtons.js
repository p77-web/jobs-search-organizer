import React from "react";
import "./RadioButtons.css";

const RadioButtons = ({ label, checked, handleRadioChange }) => {
	return (
		<div className="div__radiobuttons">
			<input
				type="radio"
				id={label}
				value={label}
				checked={checked}
				onChange={handleRadioChange}
				className="radiobuttons__input"
			/>
			<label className="radiobuttons__label">{label}</label>
			<span></span>
		</div>
	);
};

export default RadioButtons;
