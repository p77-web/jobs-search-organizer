import React from "react";
import "./JobsStatusFilter.css";
import useRadioButtonForm from "../../../hooks/FormHooks/useRadioButtonForm";

const JobsStatusFilter = ({ updateFilter }) => {
	const { filterRadioButtons } = useRadioButtonForm();

	const handleChange = (e) => {
		updateFilter(e.target.value);
	};

	return (
		<div className="JobsStatusFilterWrapper">
			<div className="JobsStatusFilter" onChange={handleChange}>
				{filterRadioButtons()}
			</div>
		</div>
	);
};

export default JobsStatusFilter;
