import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Inputs from "../UI/Input/Inputs/Inputs";
import { JobContext } from "../../contexts/JobContext/JobContext";
import useInputForm from "../../hooks/FormHooks/useInputForm";
import useCheckboxForm from "../../hooks/FormHooks/useCheckboxForm";
import FormElements from "./../UI/Input/Form Elements/FormElements";
import FormButton from "../UI/Buttons/FormButton";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Redirect } from "react-router-dom";
import "./AddJob.css";

const AddJob = ({ history }) => {
	const { user } = useContext(AuthContext);
	const { addNewJob } = useContext(JobContext);
	const { addJobFormElements } = { ...FormElements };
	const [files, setFiles] = useState();

	const { form, createArray, handleChange, isFormValid } = useInputForm(
		addJobFormElements
	);
	let userId = null;
	if (user) {
		userId = user.uid;
	}

	const handleFileChange = (e) => {
		setFiles(e.target.files);
	};

	const {
		createDocCheckboxes,
		doc_checkboxes,
		createTypeCheckboxes,
		type_checkboxes,
	} = useCheckboxForm();

	/**
	 * Submit the form
	 *
	 * @param event
	 * @public
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		addNewJob(
			form.companyName.value,
			form.address.value,
			form.industry.value,
			form.url.value,
			form.companyDescription.value,
			form.jobName.value,
			form.date.value,
			form.foundOn.value,
			form.appliedOn.value,
			form.jobDescription.value,
			doc_checkboxes,
			type_checkboxes,
			history,
			files,
			userId
		);
	};

	// getting an array of form elements
	const jobFormArray = createArray(form);

	return user ? (
		<div className="AddJob">
			<div className="AddJobContainer">
				<form onSubmit={handleSubmit} className="AddJobForm">
					<h5 className="grey-text text-darken-3">Add a new job</h5>
					<br />
					{jobFormArray.map((inputElement) => {
						if (
							inputElement.elConfiguration.elConfig.type !==
							"file"
						) {
							return (
								<Inputs
									key={inputElement.id}
									inputType={
										inputElement.elConfiguration.elType
									}
									type={
										inputElement.elConfiguration.elConfig
											.type
									}
									id={inputElement.id}
									invalid={
										!inputElement.elConfiguration.valid
									}
									touched={
										!inputElement.elConfiguration.touched
									}
									config={
										inputElement.elConfiguration.elConfig
									}
									showLabel={true}
									handleChange={(e) =>
										handleChange(e, inputElement.id)
									}
								/>
							);
						} else {
							return (
								<Inputs
									key={inputElement.id}
									inputType={
										inputElement.elConfiguration.elType
									}
									type={
										inputElement.elConfiguration.elConfig
											.type
									}
									id={inputElement.id}
									invalid={
										!inputElement.elConfiguration.valid
									}
									touched={
										!inputElement.elConfiguration.touched
									}
									config={
										inputElement.elConfiguration.elConfig
									}
									showLabel={true}
									handleChange={(e) => handleFileChange(e)}
								/>
							);
						}
					})}

					<br />
					<div className="GridWrapper">
						<Grid container alignItems="center">
							{createDocCheckboxes()}
						</Grid>
						<Grid container alignItems="center">
							{createTypeCheckboxes()}
						</Grid>
					</div>
					<FormButton
						textMessage="Add job"
						isFormValid={isFormValid}
					/>
				</form>
			</div>
		</div>
	) : (
		<Redirect to="/signin" />
	);
};

export default AddJob;
