import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import Navigation from "./Navigation/Navigation";
import Home from "./Home/Home";
import AuthContextProvider from "../contexts/AuthContext/AuthContext";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import AddJob from "./Jobs/AddJob";
import JobContextProvider from "../contexts/JobContext/JobContext";
import JobsPage from "./Home/JobsPage";
import JobDetails from "./Jobs/JobDetails";
import PageNotFound from "./Errors/PageNotFound/PageNotFound";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<AuthContextProvider>
					<Navigation />
					<JobContextProvider>
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/jobs" component={JobsPage} />
							<Route path="/job/:id" component={JobDetails} />
							<Route path="/newjob" component={AddJob} />
							<Route path="/signup" component={SignUp} />
							<Route path="/signin" component={SignIn} />
							<Route path="*" component={PageNotFound} />
						</Switch>
					</JobContextProvider>
				</AuthContextProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
