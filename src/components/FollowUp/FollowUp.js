import React, { useState, useContext } from "react";
import FollowUpModal from "../UI/Modal/FollowUpModal";
import FormElements from "../UI/Input/Form Elements/FormElements";
import useJobInputForm from "../../hooks/FormHooks/useJobInputForm";
import useRadioButtonForm from "../../hooks/FormHooks/useRadioButtonForm";
import { JobContext } from "../../contexts/JobContext/JobContext";
import ValidateButton from "../UI/Buttons/ValidateButton";
import "./FollowUp.css";

const FollowUp = ({ job, jobId }) => {
	const [formModal, setFormModal] = useState(false);

	const { updateJob } = useContext(JobContext);

	const { addFollowUpFormElements } = { ...FormElements };

	const { form } = useJobInputForm(addFollowUpFormElements);

	const { statusRadioButtons, status } = useRadioButtonForm(job.status);

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

	/**
	 * Submit job actual status form
	 *
	 * @param {object} e
	 * @public
	 */
	const handleStatusSubmit = (e, key = "status", id = jobId) => {
		e.preventDefault();
		updateJob(key, status, id);
	};

	if (job) {
		const {
			contactName,
			contactTitle,
			contactDate,
			contactPhone,
			contactEmail,
			interviewerName,
			interviewerPosition,
			interviewType,
			interviewDate,
			observations,
		} = { ...job };
		return (
			<>
				<div className="FollowUpContact">
					<h5 className="JobFollowUpHeading">Contact</h5>
					<div className="FollowUpParagraph">
						{contactName.length === 0 ? (
							"Add name"
						) : (
							<span
								className="ShowFollowUpInfo"
								data-tooltip="Name"
							>
								{contactName}
							</span>
						)}
						<span
							className="FollowUpDetailIcon ShowInfo"
							data-tooltip="Update"
							onClick={(contactName) =>
								showUpdateForm({ contactName })
							}
						>
							<i className="material-icons small right">create</i>
						</span>
					</div>
					<div>
						{formModal ? (
							<FollowUpModal
								name="contactName"
								inputUpdateData={contactName}
								jobId={jobId}
								onCloseModal={(contactName) =>
									closeModal({ contactName })
								}
								isOpen={form["contactName"].isModalOpen}
							/>
						) : null}
					</div>
					<div className="FollowUpParagraph">
						{contactTitle.length === 0 ? (
							"Add title (Manager, HR, etc.)"
						) : (
							<span
								className="ShowFollowUpInfo"
								data-tooltip="Title"
							>
								{contactTitle}
							</span>
						)}
						<span
							className="FollowUpDetailIcon ShowInfo"
							data-tooltip="Update"
							onClick={(contactTitle) =>
								showUpdateForm({ contactTitle })
							}
						>
							<i className="material-icons small right">create</i>
						</span>
					</div>
					<div>
						{formModal ? (
							<FollowUpModal
								name="contactTitle"
								inputUpdateData={contactTitle}
								jobId={jobId}
								onCloseModal={(contactTitle) =>
									closeModal({ contactTitle })
								}
								isOpen={form["contactTitle"].isModalOpen}
							/>
						) : null}
					</div>
					<div className="FollowUpParagraph">
						{contactDate.length === 0 ? (
							"Add date"
						) : (
							<span
								className="ShowFollowUpInfo"
								data-tooltip="Date"
							>
								{contactDate}
							</span>
						)}
						<span
							className="FollowUpDetailIcon ShowInfo"
							data-tooltip="Update"
							onClick={(contactDate) =>
								showUpdateForm({ contactDate })
							}
						>
							<i className="material-icons small right">create</i>
						</span>
					</div>
					<div>
						{formModal ? (
							<FollowUpModal
								name="contactDate"
								inputUpdateData={contactDate}
								jobId={jobId}
								jobDate={job.date}
								minDate={job.date}
								onCloseModal={(contactDate) =>
									closeModal({ contactDate })
								}
								isOpen={form["contactDate"].isModalOpen}
							/>
						) : null}
					</div>
					<div className="FollowUpParagraph">
						{contactPhone.length === 0 ? (
							"Add phone"
						) : (
							<span
								className="ShowFollowUpInfo"
								data-tooltip="Phone"
							>
								{contactPhone}
							</span>
						)}
						<span
							className="FollowUpDetailIcon ShowInfo"
							data-tooltip="Update"
							onClick={(contactPhone) =>
								showUpdateForm({ contactPhone })
							}
						>
							<i className="material-icons small right">create</i>
						</span>
					</div>
					<div>
						{formModal ? (
							<FollowUpModal
								name="contactPhone"
								inputUpdateData={contactPhone}
								jobId={jobId}
								onCloseModal={(contactPhone) =>
									closeModal({ contactPhone })
								}
								isOpen={form["contactPhone"].isModalOpen}
							/>
						) : null}
					</div>
					<div className="FollowUpParagraph">
						{contactEmail.length === 0 ? (
							"Add email"
						) : (
							<span
								className="ShowFollowUpInfo"
								data-tooltip="Email"
							>
								{contactEmail}
							</span>
						)}
						<span
							className="FollowUpDetailIcon ShowInfo"
							data-tooltip="Update"
							onClick={(contactEmail) =>
								showUpdateForm({ contactEmail })
							}
						>
							<i className="material-icons small right">create</i>
						</span>
					</div>
					<div>
						{formModal ? (
							<FollowUpModal
								name="contactEmail"
								inputUpdateData={contactEmail}
								jobId={jobId}
								onCloseModal={(contactEmail) =>
									closeModal({ contactEmail })
								}
								isOpen={form["contactEmail"].isModalOpen}
							/>
						) : null}
					</div>
				</div>
				<div className="FollowUpInterview">
					<h5 className="JobFollowUpHeading">Interview</h5>
					<div className="FollowUpParagraph">
						{interviewerName.length === 0 ? (
							"Add interviewer's name"
						) : (
							<span
								className="ShowFollowUpInfo"
								data-tooltip="Name(s)"
							>
								{interviewerName}
							</span>
						)}
						<span
							className="FollowUpDetailIcon ShowInfo"
							data-tooltip="Update"
							onClick={(interviewerName) =>
								showUpdateForm({ interviewerName })
							}
						>
							<i className="material-icons small right">create</i>
						</span>
					</div>
					<div>
						{formModal ? (
							<FollowUpModal
								name="interviewerName"
								inputUpdateData={interviewerName}
								jobId={jobId}
								onCloseModal={(interviewerName) =>
									closeModal({ interviewerName })
								}
								isOpen={form["interviewerName"].isModalOpen}
							/>
						) : null}
					</div>
					<div className="FollowUpParagraph">
						{interviewerPosition.length === 0 ? (
							"Add interviewer's position (Manager, HR, etc.)"
						) : (
							<span
								className="ShowFollowUpInfo"
								data-tooltip="Position"
							>
								{interviewerPosition}
							</span>
						)}
						<span
							className="FollowUpDetailIcon ShowInfo"
							data-tooltip="Update"
							onClick={(interviewerPosition) =>
								showUpdateForm({ interviewerPosition })
							}
						>
							<i className="material-icons small right">create</i>
						</span>
					</div>
					<div>
						{formModal ? (
							<FollowUpModal
								name="interviewerPosition"
								inputUpdateData={interviewerPosition}
								jobId={jobId}
								onCloseModal={(interviewerPosition) =>
									closeModal({ interviewerPosition })
								}
								isOpen={form["interviewerPosition"].isModalOpen}
							/>
						) : null}
					</div>
					<div className="FollowUpParagraph">
						{interviewType.length === 0 ? (
							"Add type (phone, face-to-face, etc.)"
						) : (
							<span
								className="ShowFollowUpInfo"
								data-tooltip="Type"
							>
								{interviewType}
							</span>
						)}
						<span
							className="FollowUpDetailIcon ShowInfo"
							data-tooltip="Update"
							onClick={(interviewType) =>
								showUpdateForm({ interviewType })
							}
						>
							<i className="material-icons small right">create</i>
						</span>
					</div>
					<div>
						{formModal ? (
							<FollowUpModal
								name="interviewType"
								inputUpdateData={interviewType}
								jobId={jobId}
								onCloseModal={(interviewType) =>
									closeModal({ interviewType })
								}
								isOpen={form["interviewType"].isModalOpen}
							/>
						) : null}
					</div>
					<div className="FollowUpParagraph">
						{interviewDate.length === 0 ? (
							"Add date"
						) : (
							<span
								className="ShowFollowUpInfo"
								data-tooltip="Date"
							>
								{interviewDate}
							</span>
						)}
						<span
							className="FollowUpDetailIcon ShowInfo"
							data-tooltip="Update"
							onClick={(interviewDate) =>
								showUpdateForm({ interviewDate })
							}
						>
							<i className="material-icons small right">create</i>
						</span>
					</div>
					<div>
						{formModal ? (
							<FollowUpModal
								name="interviewDate"
								inputUpdateData={interviewDate}
								jobId={jobId}
								minDate={job.date}
								onCloseModal={(interviewDate) =>
									closeModal({ interviewDate })
								}
								isOpen={form["interviewDate"].isModalOpen}
							/>
						) : null}
					</div>
					<div
						className="JobDescriptionArea ShowInfo"
						data-tooltip="Observations"
					>
						{observations.length === 0 ? (
							"Write your observations here."
						) : (
							<span className="ShowFollowUpInfo">
								{observations}
							</span>
						)}
						<span
							className="FollowUpDetailIcon ShowInfo"
							data-tooltip="Update"
							onClick={(observations) =>
								showUpdateForm({ observations })
							}
						>
							<i className="material-icons small right">create</i>
						</span>
					</div>
					<div>
						{formModal ? (
							<FollowUpModal
								name="observations"
								obs={observations}
								jobId={jobId}
								onCloseModal={(observations) =>
									closeModal({ observations })
								}
								isOpen={form["observations"].isModalOpen}
							/>
						) : null}
					</div>
				</div>
				{/* Radio Buttons */}
				<div className="FollowUpStatus">
					<h5 className="JobFollowUpHeading">Status</h5>
					<form
						onSubmit={handleStatusSubmit}
						id="statusForm"
						className="StatusForm"
					>
						{statusRadioButtons()}
					</form>
					<ValidateButton textMessage="Validate" />
				</div>
			</>
		);
	}
};

export default FollowUp;
