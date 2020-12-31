import React from "react";
import FormButton from "../Buttons/FormButton";
import { NavLink } from "react-router-dom";
import "./Banner.css";

function Banner() {
	return (
		<div className="Banner">
			<div className="BannerText">
				<div className="BannerHeading">
					<div className="Letters">
						<div className="Job">
							<span>J</span>
							<span>o</span>
							<span>b</span>
						</div>
						<div className="Search">
							<span>s</span>
							<span>e</span>
							<span>a</span>
							<span>r</span>
							<span>c</span>
							<span>h</span>
						</div>
						<div className="Organizer">
							<span>o</span>
							<span>r</span>
							<span>g</span>
							<span>a</span>
							<span>n</span>
							<span>i</span>
							<span>z</span>
							<span>e</span>
							<span>r</span>
						</div>
					</div>
				</div>
				<div className="BannerSubHeading">
					Searching for a new job will become a pleasure even if you
					have one
				</div>
				<NavLink to="/signin">
					<FormButton textMessage="get started" isFormValid={true} />
				</NavLink>
			</div>
			<div className="JobsLine">
				<svg
					width="700"
					height="235"
					viewBox="0 0 550 235"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					id="jobLine"
				>
					<path
						d="M1 235C6 225 19.1781 201.314 24 193C26 190 28.5 185.5 30.5 183C32.5 180.5 37 174 40.5 170.5C42.5 168 43.5 167 45.5 164.5C47.5 162 52 157.5 53.5 156C59 150.5 69 143.5 73.5 141.5C82.5 136.5 93.9637 133.5 101.5 133.5C117 131 149.071 156.5 160 165C164.5 168.5 172 173.5 178 176C181 177.5 181.5 177.5 186.5 179C190 180.05 192.5 180.5 200 180.5C207.5 180.5 208.633 180.317 214.064 179.5C221.003 178.456 224.692 176.574 231 173.5C235.485 171.314 238.5 169.5 242 167C245.5 165 252.5 159 259 154.5C263.5 150.5 290.5 125 298.5 119C309 112 322 105.5 337.5 104.5C351 102.5 372.5 110 387 119.5C394.5 124.414 411 138.5 417.5 145C422.5 150 433.879 157.363 438.728 161C447 167.204 455 170 466.5 170.5C482 171 497 164.5 508 150C523.172 130 529.5 121 535.5 98.5C541.5 76 542.5 66.5 543.5 49C544.017 39.9594 545.5 7.79593 545.5 1"
						strokeLinecap="round"
						strokeLinejoin="round"
						fill="none"
						stroke="#473ABD"
						strokeWidth="3"
					/>
				</svg>
			</div>
		</div>
	);
}

export default Banner;
