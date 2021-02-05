import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import IsSignedIn from "./IsSignedIn";
import IsSignedOut from "./IsSignedOut";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import "./Navigation.css";

const Navigation = () => {
	const { user } = useContext(AuthContext);

	const links = user ? <IsSignedIn /> : <IsSignedOut />;

	return (
		<React.Fragment>
			<Navbar
				collapseOnSelect
				bg="dark"
				fixed="top"
				expand="md"
				variant="dark"
				id="banner"
			>
				<div className="container-fluid">
					<NavLink to="/">
						<Navbar.Brand>
							<span className="Logo"></span>
						</Navbar.Brand>
					</NavLink>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						{links}
					</Navbar.Collapse>
				</div>
			</Navbar>
		</React.Fragment>
	);
};

export default Navigation;
