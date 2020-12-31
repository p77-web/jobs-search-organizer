import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Inputs from "../UI/Input/Inputs/Inputs";
import useInputForm from "../../hooks/FormHooks/useInputForm";
import FormElements from "./../UI/Input/Form Elements/FormElements";
import FormButton from "../UI/Buttons/FormButton";
import "./Auth.css";

const SignUp = ({ history }) => {
	const { signUp, isSignUpError } = useContext(AuthContext);
	const { signUpFormElements } = { ...FormElements };
	const { form, createArray, handleChange, isFormValid } = useInputForm(
		signUpFormElements
	);

	/**
	 * Submit form
	 *
	 * @param {object} e
	 * @public
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		signUp(
			form.email.value,
			form.password.value,
			form.firstName.value,
			form.lastName.value,
			history
		);
	};

	// getting the array
	const signUpFormArray = createArray(form);

	const signUpForm = (
		<div className="SignUpContainer">
			<form onSubmit={handleSubmit} className="SignUpForm">
				<h5 className="grey-text text-darken-3">Sign up</h5>
				{signUpFormArray.map((inputElement) => (
					<Inputs
						key={inputElement.id}
						inputType={inputElement.elConfiguration.elType}
						type={inputElement.elConfiguration.elConfig.type}
						id={inputElement.id}
						invalid={!inputElement.elConfiguration.valid}
						touched={!inputElement.elConfiguration.touched}
						config={inputElement.elConfiguration.elConfig}
						showLabel={true}
						handleChange={(e) => handleChange(e, inputElement.id)}
					/>
				))}
				<FormButton textMessage="Signup" isFormValid={isFormValid} />
				<div className="red-text text-darken-1 left">
					{isSignUpError ? (
						<span>
							The email provided is already in use! Please add a
							different email.
						</span>
					) : null}
				</div>
			</form>
		</div>
	);

	return signUpForm;
};

export default SignUp;
