import React from "react";
import "./SearchFilter.css";
import useRadioButtonForm from "../../../hooks/FormHooks/useRadioButtonForm";

const SearchFilter = ({ updateSearch }) => {
	const { searchRadioButtons } = useRadioButtonForm();
	const handleChange = (e) => {
		updateSearch(e.target.value);
	};

	return (
		<div className="SearchFilterWrapper">
			<div className="SearchFilter" onChange={handleChange}>
				{searchRadioButtons()}
			</div>
		</div>
	);
};

export default SearchFilter;
