import React, { useContext } from "react";
import JobsList from "../Jobs/JobsList";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Redirect } from "react-router-dom";
import useFirestoreJobs from "../../hooks/DatabaseHooks/useFirestoreJobs";

const JobsPage = () => {
	const { user } = useContext(AuthContext);

	const { jobs } = useFirestoreJobs("jobs");

	return user ? (
		jobs ? (
			<JobsList jobs={jobs} userId={user.uid} />
		) : (
			<div className="loading">Getting your jobs...</div>
		)
	) : (
		<Redirect to="/signin" />
	);
};

export default JobsPage;
