import React from "react";
import "./Buttons.css";

const FormButton = ({ textMessage, isFormValid }) => {
	return (
		<div className="input-field">
			<button disabled={!isFormValid} className="btn FormButton">
				{textMessage}
			</button>
		</div>
	);
};

export default FormButton;
