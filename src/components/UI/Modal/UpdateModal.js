import React, { useContext } from "react";
import Inputs from "../Input/Inputs/Inputs";
import useJobInputForm from "../../../hooks/FormHooks/useJobInputForm";
import FormElements from "../Input/Form Elements/FormElements";
import { JobContext } from "../../../contexts/JobContext/JobContext";
import "./UpdateModal.css";

const UpdateModal = ({
	name,
	jobId,
	onCloseModal,
	isOpen,
	inputUpdateData,
	companyTextareaDescription,
	jobTextareaDescription,
}) => {
	const { updateJob } = useContext(JobContext);
	const { addJobFormElements } = { ...FormElements };

	const { form, handleChange, isFormValid } = useJobInputForm(
		addJobFormElements
	);
	const modalClasses = isOpen ? "ModalBackdropActive" : "ModalBackdrop";
	const modalContentClasses = isOpen ? "ModalContentActive" : "ModalContent";
	const modalTextarea =
		form[name].elType === "textarea" ? "ModalTextarea" : "";
	const modalUpdateButton =
		form[name].elType === "textarea"
			? "UpdateBtn UpdateTextareaBtn"
			: "UpdateBtn";

	const textarea = [];
	const modalBtn = [];
	textarea.push(modalContentClasses, modalTextarea);
	modalBtn.push(modalUpdateButton);

	/**
	 * Submit form
	 *
	 * @param {object} e
	 * @public
	 */
	const handleSubmit = (e, key = name, id = jobId) => {
		e.preventDefault();
		updateJob(key, form[name].value, id);
		onCloseModal();
	};

	return (
		<>
			<div className="ModalContainer">
				<div className={modalClasses}>
					<div className={textarea.join(" ")}>
						<span className="CloseSpan" onClick={onCloseModal}>
							<i className="material-icons CloseIcon red lighten-1">
								close
							</i>
						</span>
						<form
							onSubmit={handleSubmit}
							className="white ModalForm"
						>
							<Inputs
								className="UpdateInput"
								key={name}
								inputUpdateData={inputUpdateData}
								showLabel={false}
								companyTextareaDescription={
									companyTextareaDescription
								}
								jobTextareaDescription={jobTextareaDescription}
								inputType={form[name].elType}
								type={form[name].elConfig.type}
								invalid={!form[name].valid}
								touched={!form[name].touched}
								config={form[name].elConfig}
								helperText={form[name].elConfig.helperText}
								handleChange={(e) => handleChange(e, name)}
							/>
							<button
								disabled={!isFormValid}
								className={modalBtn.join(" ")}
							>
								<span>
									<i className="material-icons UpdateIcon blue lighten-1">
										cloud_done
									</i>
								</span>
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdateModal;
