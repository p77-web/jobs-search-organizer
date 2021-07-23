import React from "react";
import "./Footer.css";

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<div className="Footer">
			<p>{year} All rights reserved. Website created by Paul F</p>
		</div>
	);
};

export default Footer;
