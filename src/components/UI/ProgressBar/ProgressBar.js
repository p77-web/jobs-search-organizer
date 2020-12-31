import React, { useEffect } from "react";
import "./ProgressBar.css";

const ProgressBar = ({ progress, setProgress }) => {
	useEffect(() => {
		if (progress === 100) {
			setProgress(null);
		}
	}, [progress, setProgress]);
	return (
		<div
			style={{
				width: progress + "%",
			}}
			className="ProgressBar"
		></div>
	);
};

export default ProgressBar;
