import React from "react";
import "./Checkboxes.css";

const Checkboxes = ({ label, name, handleCheckboxChange }) => (
	<div className="form-check div__checkboxes">
		<input
			type="checkbox"
			id={label}
			name={name}
			onChange={handleCheckboxChange}
		/>
		<label htmlFor={label} className="checkboxes__label">
			{label}
		</label>
		<span></span>
	</div>
);

export default Checkboxes;
