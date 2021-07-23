import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const IsSignedIn = () => {
	const { signOut } = useContext(AuthContext);
	return (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<NavLink
					className="nav-link"
					to="/jobs"
					activeClassName="selectedLink"
					activeStyle={{
						color: "#3abb47",
					}}
				>
					Jobs
				</NavLink>
			</li>
			<li className="nav-item">
				<NavLink
					className="nav-link"
					to="/newjob"
					activeClassName="selectedLink"
					activeStyle={{
						color: "#3abb47",
					}}
				>
					New job
				</NavLink>
			</li>
			<li className="nav-item">
				<NavLink
					className="nav-link"
					to="/"
					activeClassName="selectedLink"
					onClick={() => signOut()}
				>
					Logout
				</NavLink>
			</li>
		</ul>
	);
};

export default IsSignedIn;
