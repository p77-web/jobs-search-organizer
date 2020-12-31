import { useState, useEffect } from "react";
import firebase from "../../config/fbConfig";
import useUsersCollection from "../../hooks/DatabaseHooks/useUsersCollection";

const useProviderAuth = () => {
	const [user, setUser] = useState(null);
	const [isSignInError, setIsSignInError] = useState(false);
	const [isSignUpError, setIsSignUpError] = useState(false);

	const { usersCollectionRef } = useUsersCollection("users");

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	const signUp = (email, password, firstName, lastName, history) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				return usersCollectionRef.doc(response.user.uid).set({
					nickName: firstName,
					userFullName: firstName + " " + lastName,
				});
			})
			.then(() => {
				history.push("/jobs");
			})
			.catch((err) => {
				console.log(err);
				setIsSignUpError(true);
			});
	};

	const signIn = (email, password, history) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				history.push("/jobs");
			})
			.catch((err) => {
				console.log(err);
				setIsSignInError(true);
			});
	};

	const signOut = () => {
		return firebase
			.auth()
			.signOut()
			.then(() => {
				setUser(null);
				setIsSignUpError(false);
				setIsSignInError(false);
			});
	};

	return {
		user,
		signUp,
		signIn,
		signOut,
		isSignUpError,
		isSignInError,
	};
};

export default useProviderAuth;
