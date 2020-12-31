import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Redirect } from "react-router";
import Inputs from "../UI/Input/Inputs/Inputs";
import useInputForm from "../../hooks/FormHooks/useInputForm";
import FormElements from "../UI/Input/Form Elements/FormElements";
import FormButton from "../UI/Buttons/FormButton";
import { NavLink } from "react-router-dom";
import "./Auth.css";

const SignIn = ({ history }) => {
	const { user, signIn, isSignInError } = useContext(AuthContext);
	const { signInFormElements } = { ...FormElements };
	const { form, createArray, handleChange, isFormValid } = useInputForm(
		signInFormElements
	);

	/**
	 * Submit form
	 *
	 * @param {object} e
	 * @public
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		signIn(form.email.value, form.password.value, history);
	};

	if (user) return <Redirect to="/jobs" />;

	// getting the array
	const signInFormArray = createArray(form);

	const signInForm = (
		<div className="SignInContainer">
			<form onSubmit={handleSubmit} className="SignInForm">
				<h5 className="grey-text text-darken-3">Sign In</h5>
				{signInFormArray.map((inputElement) => (
					<Inputs
						key={inputElement.id}
						inputType={inputElement.elConfiguration.elType}
						type={inputElement.elConfiguration.elConfig.type}
						id={inputElement.id}
						invalid={!inputElement.elConfiguration.valid}
						touched={!inputElement.elConfiguration.touched}
						config={inputElement.elConfiguration.elConfig}
						helperText={
							inputElement.elConfiguration.elConfig.helperText
						}
						showLabel={true}
						handleChange={(e) => handleChange(e, inputElement.id)}
					/>
				))}
				<FormButton textMessage="Login" isFormValid={isFormValid} />
				<div className="red-text text-darken-1 left">
					{isSignInError ? (
						<span>Your provided credentials were incorrect!</span>
					) : null}
				</div>
				<div className="NewAccount">
					If you don't have an account you can{" "}
					<NavLink to="/signup">Sign Up</NavLink> now!
				</div>
			</form>
		</div>
	);

	return signInForm;
};

export default SignIn;
