import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./components/App";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";

import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import firebase from "./config/fbConfig";
import RootReducer from "./store/reducers/RootReducer";

const initialState = {};

// react-redux-firebase config
const rrfConfig = {
	userProfile: "users",
	// userProfile: null
	useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// create the redux store
const store = createStore(
	RootReducer,
	initialState,
	compose(applyMiddleware(thunk))
);

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance, // <- if firestore is used
};

// function used to avoid seeing the login menu while accessing the db
// it needs the RootReducer to be called
function AuthIsLoaded({ children }) {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth)) return <div className="loading">Loading...</div>;
	return children;
}

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<AuthIsLoaded>
				<App />
			</AuthIsLoaded>
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById("root")
);
