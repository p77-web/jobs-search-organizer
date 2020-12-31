import React from "react";
import "./NoJobMessage.css";
import { NavLink } from "react-router-dom";

const NoJobMessage = () => {
	const link = (
		<NavLink className="nav-link" to="/newjob">
			new job
		</NavLink>
	);

	return (
		<div className="NoJobMessage">
			<h3>You have no job registred</h3>
			<h6>Please add a {link}</h6>
		</div>
	);
};

export default NoJobMessage;
