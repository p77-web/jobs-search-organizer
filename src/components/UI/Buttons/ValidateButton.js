import React from "react";
import "./Buttons.css";

const Button = ({ textMessage }) => {
	return (
		<div className="input-field">
			<button form="statusForm" className="btn FormButton">
				{textMessage}
			</button>
		</div>
	);
};

export default Button;
