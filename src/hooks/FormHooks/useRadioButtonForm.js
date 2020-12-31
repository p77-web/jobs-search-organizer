import React, { useState } from "react";
import RadioButtons from "../../components/UI/Input/RadioButtons/RadioButtons";

const STATUS_OPTIONS = ["No Answer", "Interview", "Accepted", "Refused"];
const FILTER_OPTIONS = [
	"All",
	"No Status",
	"No Answer",
	"Interview",
	"Accepted",
	"Refused",
];
const SEARCH_OPTIONS = ["Company", "Job"];

const useRadioButtonForm = (jobStatus) => {
	// jobStatus value kept in db for radio buttons
	const [status, setStatus] = useState(jobStatus);
	// default value for filter
	const [filter, setFilter] = useState("All");
	// default value for filter
	const [search, setSearch] = useState("Company");

	/**
	 * Handle changes on form radio buttons
	 *
	 * @param {object} e
	 * @public
	 */
	const handleRadioChange = (e) => {
		const { id } = e.target;
		setStatus(id);
		setFilter(id);
		setSearch(id);
	};

	/**
	 * Create status radio buttons input
	 *
	 * @param {object} option
	 * @public
	 */
	const createStatusRadioButtons = (option) => {
		return (
			<RadioButtons
				label={option}
				checked={status === option}
				handleRadioChange={handleRadioChange}
				key={option}
			/>
		);
	};

	/**
	 * Create filter radio buttons input
	 *
	 * @param {object} option
	 * @public
	 */
	const createFilterRadioButtons = (option) => {
		return (
			<RadioButtons
				label={option}
				checked={filter === option}
				handleRadioChange={handleRadioChange}
				key={option}
			/>
		);
	};

	/**
	 * Create search radio buttons input
	 *
	 * @param {object} option
	 * @public
	 */
	const createSearchRadioButtons = (option) => {
		return (
			<RadioButtons
				label={option}
				checked={search === option}
				handleRadioChange={handleRadioChange}
				key={option}
			/>
		);
	};

	const statusRadioButtons = () =>
		STATUS_OPTIONS.map(createStatusRadioButtons);
	const filterRadioButtons = () =>
		FILTER_OPTIONS.map(createFilterRadioButtons);
	const searchRadioButtons = () =>
		SEARCH_OPTIONS.map(createSearchRadioButtons);

	return {
		statusRadioButtons,
		status,
		filterRadioButtons,
		filter,
		searchRadioButtons,
		search,
	};
};

export default useRadioButtonForm;
