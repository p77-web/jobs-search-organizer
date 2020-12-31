import React, { useState } from "react";
import Checkboxes from "../../components/UI/Input/Checkboxes/Checkboxes";
const DOC_OPTIONS = ["Resume", "Portfolio", "Diploma", "Letter"];
const TYPE_OPTIONS = ["Full time", "Part time", "Contract", "Internship"];

const useCheckboxForm = () => {
	// create checkboxes with false value
	const [doc_checkboxes, setDocCheckboxes] = useState(
		DOC_OPTIONS.reduce(
			(options, option) => ({
				...options,
				[option]: false,
			}),
			{}
		)
	);

	// create checkboxes with false value
	const [type_checkboxes, setTypeCheckboxes] = useState(
		TYPE_OPTIONS.reduce(
			(options, option) => ({
				...options,
				[option]: false,
			}),
			{}
		)
	);

	/**
	 * Handle changes on form checkboxes
	 *
	 * @param {object} e
	 * @public
	 */
	const handleCheckboxChange = (e) => {
		const { id } = e.target;

		DOC_OPTIONS.map((doc) => {
			if (id === doc) {
				setDocCheckboxes({
					...doc_checkboxes,
					[id]: !doc_checkboxes[id],
				});
			}
			return id;
		});

		TYPE_OPTIONS.map((type) => {
			if (id === type) {
				setTypeCheckboxes({
					...type_checkboxes,
					[id]: !type_checkboxes[id],
				});
			}
			return id;
		});
	};

	/**
	 * Create a checkbox input
	 *
	 * @param {object} option
	 * @public
	 */
	const createCheckbox = (option) => (
		<Checkboxes
			label={option}
			name={option}
			handleCheckboxChange={handleCheckboxChange}
			key={option}
		/>
	);

	/**
	 * Create checkboxes
	 *
	 * @param
	 * @public
	 */
	const createDocCheckboxes = () => DOC_OPTIONS.map(createCheckbox);
	const createTypeCheckboxes = () => TYPE_OPTIONS.map(createCheckbox);

	return {
		createDocCheckboxes,
		doc_checkboxes,
		createTypeCheckboxes,
		type_checkboxes,
	};
};

export default useCheckboxForm;
