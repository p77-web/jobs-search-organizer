import React, { useContext, useState, useReducer } from "react";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { JobContext } from "../../contexts/JobContext/JobContext";
import FormElements from "../UI/Input/Form Elements/FormElements";
import UpdateModal from "../UI/Modal/UpdateModal";
import FollowUp from "../FollowUp/FollowUp";
import StatusSwitch from "./StatusSwitch";
import FollowUpButton from "../UI/Buttons/FollowUpButton";
import firebase, { Firestore, filesStorage } from "../../config/fbConfig";
import useInputForm from "../../hooks/FormHooks/useInputForm";
import Inputs from "../UI/Input/Inputs/Inputs";
import FormButton from "../UI/Buttons/FormButton";
import useFirestoreJobs from "../../hooks/DatabaseHooks/useFirestoreJobs";
import ProgressBar from "../UI/ProgressBar/ProgressBar";
import "./JobDetails.css";
require("firebase/database");

const DETAILS_ACTIONS = {
	COMPANY: "Company",
	JOB: "Job",
	DOCS_TYPE: "Docs&Type",
	FOLLOW_UP: "Follow Up",
};

const initialState = {
	companyDetails: true,
	jobDetails: false,
	docTypeDetails: false,
	followUpDetails: false,
};

const JobDetailed = (props) => {
	const { user } = useContext(AuthContext);
	const { deleteAFile } = useContext(JobContext);

	const [formModal, setFormModal] = useState(false);
	const [formFile, setFormFile] = useState(null);
	const [isFileFormValid, setIsFileFormValid] = useState(false);
	const [progress, setProgress] = useState(null);

	const { addJobFormElements } = { ...FormElements };

	const { form, createArray } = useInputForm(addJobFormElements);

	const detailsReducer = (details, action) => {
		switch (action.type) {
			case DETAILS_ACTIONS.COMPANY:
				return {
					companyDetails: !details.companyDetails,
					jobDetails: false,
					docTypeDetails: false,
					followUpDetails: false,
				};
			case DETAILS_ACTIONS.JOB:
				return {
					companyDetails: false,
					jobDetails: !details.jobDetails,
					docTypeDetails: false,
					followUpDetails: false,
				};
			case DETAILS_ACTIONS.DOCS_TYPE:
				return {
					companyDetails: false,
					jobDetails: false,
					docTypeDetails: !details.docTypeDetails,
					followUpDetails: false,
				};
			case DETAILS_ACTIONS.FOLLOW_UP:
				return {
					companyDetails: false,
					jobDetails: false,
					docTypeDetails: false,
					followUpDetails: !details.followUpDetails,
				};
			default:
				throw new Error("Error on job details!");
		}
	};

	const [details, dispatch] = useReducer(detailsReducer, initialState);

	const { jobs } = useFirestoreJobs("jobs");
	let job = null;
	if (jobs) {
		job = jobs.find(
			(selectedJob) =>
				selectedJob.firestoreJobId === props.match.params.id
		);
	}

	const handleFileChange = (e) => {
		if (e.target.files.length !== 0) {
			setFormFile(e.target.files);
			setIsFileFormValid(true);
		} else {
			setIsFileFormValid(false);
		}
	};

	// getting an array of form elements
	const jobFormArray = createArray(form);

	/**
	 * Submit the form
	 *
	 * @param event
	 * @public
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		if (formFile) {
			updateFiles(formFile, props.match.params.id);
			e.target.reset();
		}
	};

	async function deleteFile(name) {
		let fileRef = null;
		try {
			fileRef = await filesStorage.ref();
		} catch (error) {
			console.log(error);
		}
		const deletedFile = fileRef.child(
			`files/${props.match.params.id}/${name}`
		);
		deletedFile
			.delete()
			.then(function () {
				console.log("File deleted:", name);
			})
			.catch(function (error) {
				console.log(error);
			});
		deleteAFile(props.match.params.id, name);
	}

	let uploadFiles = (filesNameArray, jobsDB, id) => {
		filesNameArray.map(async (file) => {
			try {
				const storageFilesRef = await filesStorage.ref(
					`files/${id}/${file.name}`
				);
				const task = await storageFilesRef.put(file);
				const url = await task.ref.getDownloadURL();
				await storageFilesRef.put(file).on("state_changed", (snap) => {
					let progress =
						(snap.bytesTransferred / snap.totalBytes) * 100;
					setProgress(progress);
				});
				jobsDB.update({
					files: firebase.firestore.FieldValue.arrayUnion({
						name: file.name,
						url: url,
					}),
				});
			} catch (error) {
				console.log(error);
			}
			return file;
		});
	};

	const updateFiles = async (files, id) => {
		const fileNameValue = Object.values(files);
		let jobsDB;
		try {
			jobsDB = await Firestore.collection("jobs").doc(id);
		} catch (error) {
			console.log(error);
		}
		if (!job.files) {
			uploadFiles(fileNameValue, jobsDB, id);
		} else {
			const filteredArray = job.files.filter((dbFile) =>
				fileNameValue.some(
					(inputFile) => dbFile.name === inputFile.name
				)
			);
			filteredArray.forEach((dbFileName) => {
				jobsDB.update({
					files: firebase.firestore.FieldValue.arrayRemove({
						name: dbFileName.name,
						url: dbFileName.url,
					}),
				});
			});
			uploadFiles(fileNameValue, jobsDB, id);
		}
		setIsFileFormValid(false);
	};

	if (job) {
		const filesArray =
			Array.isArray(job.files) && job.files.length ? (
				job.files.map((file) => {
					return (
						<div className="JobFiles" key={file.url}>
							<a
								href={file.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								<p className="grey-text">{file.name}</p>
							</a>
							<span
								className="DeleteFileIcon"
								onClick={() => deleteFile(file.name)}
							>
								<i className="material-icons small right">
									delete_forever
								</i>{" "}
							</span>
						</div>
					);
				})
			) : (
				<div>No files</div>
			);

		let {
			id,
			companyName,
			address,
			industry,
			url,
			companyDescription,
			jobName,
			date,
			foundOn,
			appliedOn,
			status,
			doc_checkboxes,
			type_checkboxes,
			jobDescription,
		} = { ...job };

		let doc = Object.keys(doc_checkboxes).filter(
			(checkbox) => job.doc_checkboxes[checkbox]
		);
		let type = Object.keys(type_checkboxes).filter(
			(checkbox) => job.type_checkboxes[checkbox]
		);

		let jobStatus = StatusSwitch(status);

		const Theme = [];
		Theme.push("Theme", jobStatus);

		/**
		 * Update form element
		 *
		 * @param {object} elId
		 * @public
		 */
		const showUpdateForm = (elId) => {
			const id = Object.keys(elId)[0];
			for (const key in form) {
				form[key].isModalOpen = false;
			}
			form[id].isModalOpen = true;
			setFormModal(true);
		};

		/**
		 * Close update modal form
		 *
		 * @param {object} elId
		 * @public
		 */
		const closeModal = (elId) => {
			const id = Object.keys(elId)[0];
			if (form[id].isModalOpen) {
				form[id].isModalOpen = false;
				setFormModal(false);
			}
		};

		const jobElementsDetails = (
			<>
				<div className="JobDetailsButtons">
					<span>
						<i className="material-icons">add</i>
					</span>
					<FollowUpButton
						textMessage="Company"
						toggleDetails={() => {
							dispatch({ type: DETAILS_ACTIONS.COMPANY });
						}}
					/>
					<FollowUpButton
						textMessage="Job"
						toggleDetails={() => {
							dispatch({ type: DETAILS_ACTIONS.JOB });
						}}
					/>
					<FollowUpButton
						textMessage="Docs&Type"
						toggleDetails={() => {
							dispatch({ type: DETAILS_ACTIONS.DOCS_TYPE });
						}}
					/>
					<FollowUpButton
						textMessage="Follow Up"
						toggleDetails={() => {
							dispatch({ type: DETAILS_ACTIONS.FOLLOW_UP });
						}}
					/>
				</div>
				{/* Company */}
				<div className="JobDetailsWrapper">
					{details.companyDetails ? (
						<div className="CompanyWrapper">
							<div className={Theme.join(" ")} key={id}>
								<div className="CompanyDetails">
									<h5
										className="JobDetailsHeading ShowInfo"
										data-tooltip="Company"
									>
										{companyName}
										<span
											className="JobDetailIcon ShowInfo"
											data-tooltip="Update"
											onClick={(companyName) =>
												showUpdateForm({ companyName })
											}
										>
											<i className="material-icons small">
												create
											</i>
										</span>
									</h5>
									{form["companyName"].isModalOpen &&
									formModal ? (
										<UpdateModal
											name="companyName"
											inputUpdateData={companyName}
											jobId={props.match.params.id}
											onCloseModal={(companyName) =>
												closeModal({ companyName })
											}
											isOpen={
												form["companyName"].isModalOpen
											}
										/>
									) : null}
									<p
										className="JobDetailsParagraph grey-text ShowInfo"
										data-tooltip="Industry"
									>
										{industry}
										<span
											className="JobDetailIcon ShowInfo"
											data-tooltip="Update"
											onClick={(industry) =>
												showUpdateForm({ industry })
											}
										>
											<i className="material-icons small">
												create
											</i>
										</span>
									</p>
									{form["industry"].isModalOpen &&
									formModal ? (
										<UpdateModal
											name="industry"
											inputUpdateData={industry}
											jobId={props.match.params.id}
											onCloseModal={(industry) =>
												closeModal({ industry })
											}
											isOpen={
												form["industry"].isModalOpen
											}
										/>
									) : null}
									<p
										className="Url ShowInfo"
										data-tooltip="Website"
									>
										<a href={`${url}`} target="_blind">
											{url}
										</a>
										<span
											className="JobDetailIcon ShowInfo"
											data-tooltip="Update"
											onClick={(url) =>
												showUpdateForm({ url })
											}
										>
											<i className="material-icons small">
												create
											</i>
										</span>
									</p>
									{form["url"].isModalOpen && formModal ? (
										<UpdateModal
											name="url"
											inputUpdateData={url}
											jobId={props.match.params.id}
											onCloseModal={(url) =>
												closeModal({ url })
											}
											isOpen={form["url"].isModalOpen}
										/>
									) : null}
									<p
										className="JobDetailsParagraph ShowInfo"
										data-tooltip="Address"
									>
										{address}
										<span
											className="JobDetailIcon ShowInfo"
											data-tooltip="Update"
											onClick={(address) =>
												showUpdateForm({ address })
											}
										>
											<i className="material-icons small">
												create
											</i>
										</span>
									</p>
									{form["address"].isModalOpen &&
									formModal ? (
										<UpdateModal
											name="address"
											inputUpdateData={address}
											jobId={props.match.params.id}
											onCloseModal={(address) =>
												closeModal({ address })
											}
											isOpen={form["address"].isModalOpen}
										/>
									) : null}
									<div
										className="JobDescriptionArea ShowInfo"
										data-tooltip="Description"
									>
										{companyDescription.length === 0 ? (
											"Write the company description here."
										) : (
											<span>{companyDescription}</span>
										)}
										<span
											className="JobDetailIcon ShowInfo"
											data-tooltip="Update"
											onClick={(companyDescription) =>
												showUpdateForm({
													companyDescription,
												})
											}
										>
											<i className="material-icons small">
												create
											</i>
										</span>
									</div>
									{form["companyDescription"].isModalOpen &&
									formModal ? (
										<UpdateModal
											name="companyDescription"
											companyTextareaDescription={
												companyDescription
											}
											jobId={props.match.params.id}
											onCloseModal={(
												companyDescription
											) =>
												closeModal({
													companyDescription,
												})
											}
											isOpen={
												form["companyDescription"]
													.isModalOpen
											}
										/>
									) : null}
								</div>
							</div>
						</div>
					) : null}
					{/* Job */}
					{details.jobDetails ? (
						<div className="JobWrapper">
							<div className={Theme.join(" ")} key={id}>
								<div className="JobDetails">
									<h5
										className="JobDetailsHeading ShowInfo"
										data-tooltip="Job"
									>
										{jobName}
										<span
											className="JobDetailIcon ShowInfo"
											data-tooltip="Update"
											onClick={(jobName) =>
												showUpdateForm({ jobName })
											}
										>
											<i className="material-icons small">
												create
											</i>
										</span>
									</h5>
									{form["jobName"].isModalOpen &&
									formModal ? (
										<UpdateModal
											name="jobName"
											inputUpdateData={jobName}
											jobId={props.match.params.id}
											onCloseModal={(jobName) =>
												closeModal({ jobName })
											}
											isOpen={form["jobName"].isModalOpen}
										/>
									) : null}
									<p
										className="JobDetailsParagraph grey-text ShowInfo"
										data-tooltip="Date"
									>
										{date}
										<span
											className="JobDetailIcon ShowInfo"
											data-tooltip="Update"
											onClick={(date) =>
												showUpdateForm({ date })
											}
										>
											<i className="material-icons small">
												create
											</i>
										</span>
									</p>
									{form["date"].isModalOpen && formModal ? (
										<UpdateModal
											name="date"
											inputUpdateData={date}
											jobId={props.match.params.id}
											onCloseModal={(date) =>
												closeModal({ date })
											}
											isOpen={form["date"].isModalOpen}
										/>
									) : null}
									<p
										className="JobDetailsParagraph ShowInfo"
										data-tooltip="Found on"
									>
										{foundOn}
										<span
											className="JobDetailIcon ShowInfo"
											data-tooltip="Update"
											onClick={(foundOn) =>
												showUpdateForm({ foundOn })
											}
										>
											<i className="material-icons small">
												create
											</i>
										</span>
									</p>
									{form["foundOn"].isModalOpen &&
									formModal ? (
										<UpdateModal
											name="foundOn"
											inputUpdateData={foundOn}
											jobId={props.match.params.id}
											onCloseModal={(foundOn) =>
												closeModal({ foundOn })
											}
											isOpen={form["foundOn"].isModalOpen}
										/>
									) : null}
									<p
										className="JobDetailsParagraph ShowInfo"
										data-tooltip="Applied on"
									>
										{appliedOn}
										<span
											className="JobDetailIcon ShowInfo"
											data-tooltip="Update"
											onClick={(appliedOn) =>
												showUpdateForm({ appliedOn })
											}
										>
											<i className="material-icons small">
												create
											</i>
										</span>
									</p>
									{form["appliedOn"].isModalOpen &&
									formModal ? (
										<UpdateModal
											name="appliedOn"
											inputUpdateData={appliedOn}
											jobId={props.match.params.id}
											onCloseModal={(appliedOn) =>
												closeModal({ appliedOn })
											}
											isOpen={
												form["appliedOn"].isModalOpen
											}
										/>
									) : null}
									<div
										className="JobDescriptionArea ShowInfo"
										data-tooltip="Description"
									>
										{jobDescription.length === 0 ? (
											"Write the job description here."
										) : (
											<span>{jobDescription}</span>
										)}
										<span
											className="JobDetailIcon ShowInfo"
											data-tooltip="Update"
											onClick={(jobDescription) =>
												showUpdateForm({
													jobDescription,
												})
											}
										>
											<i className="material-icons small">
												create
											</i>
										</span>
									</div>
									{form["jobDescription"].isModalOpen &&
									formModal ? (
										<UpdateModal
											name="jobDescription"
											jobTextareaDescription={
												jobDescription
											}
											jobId={props.match.params.id}
											onCloseModal={(jobDescription) =>
												closeModal({
													jobDescription,
												})
											}
											isOpen={
												form["jobDescription"]
													.isModalOpen
											}
										/>
									) : null}
								</div>
							</div>
						</div>
					) : null}
					{/* Docs & Types */}
					{details.docTypeDetails ? (
						<div className="DocsTypeWrapper">
							<div className={Theme.join(" ")}>
								<div className="DocsTypeDetails">
									<h6 className="JobDetailsHeading">
										Document(s):
									</h6>
									<Grid
										container
										direction="row"
										justify="flex-start"
										alignItems="center"
									>
										{doc.length > 0 ? (
											doc.map((checkbox) => {
												return (
													<p
														className="JobDocsType grey-text"
														key={checkbox}
													>
														{checkbox}
													</p>
												);
											})
										) : (
											<p className="JobDocsType grey-text">
												Nothing sent!
											</p>
										)}
									</Grid>
									<h6 className="JobDetailsHeading">
										Job type:
									</h6>
									<Grid
										container
										direction="row"
										justify="flex-start"
										alignItems="center"
									>
										{type.length > 0 ? (
											type.map((checkbox) => {
												return (
													<p
														className="JobDocsType grey-text"
														key={checkbox}
													>
														{checkbox}
													</p>
												);
											})
										) : (
											<p className="JobDocsType grey-text">
												Nothing to show!
											</p>
										)}
									</Grid>
								</div>
								<h6 className="JobDetailsHeading FilesHeading">
									Files:
								</h6>
								<div className="ProgressBarWrapper">
									{progress && (
										<ProgressBar
											progress={progress}
											setProgress={setProgress}
										/>
									)}
								</div>
								<div className="FilesWrapper">
									<div className="FilesDetails">
										{filesArray}
									</div>
								</div>
								{/* Form */}
								<form
									onSubmit={handleSubmit}
									className="AddFileDetailsForm"
								>
									{jobFormArray.map((inputElement) => {
										if (
											inputElement.elConfiguration
												.elConfig.type === "file"
										) {
											return (
												<Inputs
													key={inputElement.id}
													inputType={
														inputElement
															.elConfiguration
															.elType
													}
													type={
														inputElement
															.elConfiguration
															.elConfig.type
													}
													id={inputElement.id}
													invalid={
														!inputElement
															.elConfiguration
															.valid
													}
													touched={
														!inputElement
															.elConfiguration
															.touched
													}
													config={
														inputElement
															.elConfiguration
															.elConfig
													}
													showLabel={true}
													handleChange={(e) =>
														handleFileChange(e)
													}
												/>
											);
										} else {
											return null;
										}
									})}
									<FormButton
										textMessage="Add file(s)"
										isFormValid={isFileFormValid}
									/>
								</form>
								{/* end Form */}
							</div>
						</div>
					) : null}
					{/* Follow up */}
					{details.followUpDetails ? (
						<div className="FollowUpWrapper">
							<div className={Theme.join(" ")}>
								<div className="FollowUpDetails">
									<FollowUp
										jobId={props.match.params.id}
										job={job}
									></FollowUp>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</>
		);
		return user ? jobElementsDetails : <Redirect to="/signin" />;
	} else {
		return <div className="loading">Getting your job...</div>;
	}
};

export default JobDetailed;
