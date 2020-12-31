import { useState } from "react";

const useInputForm = (initialForm) => {
	const [isFormValid, setIsFormValid] = useState(false);
	const [form, setForm] = useState(initialForm);
	
	/**
	 * Create an array with elements from form
	 * They are used into the Inputs component
	 *
	 * @param {object} form
	 * @public
	 */
	const createArray = (form) => {
		const formArray = [];

		Object.keys(form).forEach((key) => {
			formArray.push({ id: key, elConfiguration: form[key] });
		});
		return formArray;
	};

	/**
	 * Create an array with elements from job details
	 *
	 * @param {object} job
	 * @public
	 */
	const createJobArray = (job) => {
		const jobArray = [];

		Object.keys(job).forEach((key) => {
			jobArray.push({ key, el: job[key] });
		});
		return jobArray;
	};

	/**
	 * Handle changes on form inputs
	 *
	 * @param {object} e
	 * @param {string} elId
	 * @public
	 */
	const handleChange = (e, elId) => {
		// get a copy of the form object
		const mainForm = {
			...form,
		};

		// get elements values by each id
		const formElement = {
			...mainForm[elId],
		};

		// add the input value into element value
		formElement.value = e.target.value;

		// verify if form inputs are valid
		formElement.valid = verifyInputsValidation(
			formElement.value,
			formElement.elValidation
		);

		// add the element after verification
		mainForm[elId] = formElement;

		// verify if the form is valid
		let isFormValid = true;
		for (const elId in mainForm) {
			isFormValid = mainForm[elId].valid && isFormValid;
		}

		// verify if the form is touched
		let isFormTouched = true;
		for (const elId in mainForm) {
			isFormTouched = mainForm[elId].touched && isFormTouched;
		}

		setForm(mainForm);
		setIsFormValid(isFormValid);
	};

	/**
	 * Verify if the form inputs are valid
	 *
	 * @param {string} value
	 * @param {object} rule
	 * @public
	 */
	const verifyInputsValidation = (value, rule) => {
		let isValid = true;

		if (!rule) {
			return true;
		}

		if (rule.required) {
			isValid = value.trim() !== "" && isValid;
		}

		// it has to follow this pattern: example@test.com
		if (rule.emailPattern) {
			isValid =
				value.match("^[A-Za-z0-9._-]+@[a-z0-9.-]+?\\.[a-z]{2,3}$") &&
				isValid;
		}

		// it has to follow this pattern: between 6 and 8 characters,
		// at least one lowercase letter, one uppercase letter, one numeric digit
		if (rule.passwordPattern) {
			isValid =
				value.match("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,8}$") &&
				isValid;
		}

		// it has to follow this pattern: www.example.com
		if (rule.urlPattern) {
			isValid =
				value.match(
					"^(www\\.{1})([a-zA-Z0-9.-]{2,100}\\.{1})([a-zA-Z]){2,10}$"
				) && isValid;
		}

		if (rule.minLength) {
			isValid = value.length >= rule.minLength && isValid;
		}

		if (rule.maxLength) {
			isValid = value.length <= rule.maxLength && isValid;
		}

		return isValid;
	};

	return {
		form,
		createArray,
		createJobArray,
		handleChange,
		isFormValid,
	};
};

export default useInputForm;
