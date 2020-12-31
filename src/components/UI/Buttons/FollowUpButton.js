import React from "react";
import "./Buttons.css";

const FollowUpButton = ({ textMessage, toggleDetails }) => {
	const handleClick = (e) => {
		toggleDetails(e.target.value);
	};

	return (
		<div className="input-field">
			<button
				className="btn DetailsButton"
				value={textMessage}
				onClick={handleClick}
			>
				{textMessage}
			</button>
		</div>
	);
};

export default FollowUpButton;
