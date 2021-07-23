import React from "react";
import { NavLink, useHistory } from "react-router-dom";

const IsSignedOut = () => {
	const history = useHistory();
	const delaySignUp = (e) => {
		e.preventDefault();
		setTimeout(() => {
			history.push("/signup");
		}, 1000);
	};
	const delaySignIn = (e) => {
		e.preventDefault();
		setTimeout(() => {
			history.push("/signin");
		}, 1000);
	};

	return (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<NavLink
					className="nav-link"
					to="/signup"
					activeClassName="selectedLink"
					activeStyle={{
						color: "#3abb47",
					}}
					onClick={delaySignUp}
				>
					Sign up
				</NavLink>
			</li>
			<li className="nav-item">
				<NavLink
					className="nav-link"
					to="/signin"
					activeClassName="selectedLink"
					activeStyle={{
						color: "#3abb47",
					}}
					onClick={delaySignIn}
				>
					Sign In
				</NavLink>
			</li>
		</ul>
	);
};

export default IsSignedOut;
