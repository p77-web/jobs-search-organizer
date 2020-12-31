import React, { useState } from "react";
import NoJobMessage from "../Errors/NoJobMessage/NoJobMessage";
import JobsStatusFilter from "../Filters/JobsStatusFilter/JobsStatusFilter";
import SearchFilter from "../Filters/SearchFilter/SearchFilter";
import Inputs from "../UI/Input/Inputs/Inputs";
import JobsListCard from "../UI/Cards/JobsListCard";
import "./JobsList.css";

const JobsList = ({ jobs, userId }) => {
	const [jobFilterChosen, setJobFilterChosen] = useState("All");
	const [search, setSearch] = useState("");
	const [searchFilterChosen, setSearchFilterChosen] = useState("Company");

	// Sort array by date in ASCENDING order
	jobs = jobs.slice().sort(function (a, b) {
		if (a.date > b.date) return -1;
		if (a.date < b.date) return 1;
		return 0;
	});

	const updateJobFilter = (filter) => {
		setJobFilterChosen(filter);
	};

	let jobsLength = jobs.filter((job) => job.ownerId === userId);

	const jobsFiltered =
		jobFilterChosen === "All"
			? jobs.filter((job) => job.ownerId === userId)
			: jobs.filter(
					(job) =>
						job.ownerId === userId && job.status === jobFilterChosen
			  );

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const searchOption =
		searchFilterChosen === "Company"
			? "companyName"
			: searchFilterChosen === "Job"
			? "jobName"
			: "";

	const searchMessage =
		searchFilterChosen === "Company"
			? "Search by company"
			: searchFilterChosen === "Job"
			? "Search by job"
			: "";

	const searchFilter = !search
		? jobsFiltered
		: jobsFiltered.filter((job) =>
				job[searchOption]
					.toLowerCase()
					.includes(search.toLocaleLowerCase())
		  );

	const updateSearchFilter = (filter) => {
		setSearchFilterChosen(filter);
	};

	let message =
		jobsFiltered.length === 0
			? 'No job with "' + jobFilterChosen + '" status has found.'
			: null;

	let noJobFound = (
		<div className="NoChosenJobFound">
			<h5>{message}</h5>
		</div>
	);

	let jobsFound = (
		<div className="JobsContainer">
			{jobs &&
				searchFilter.map((job) => {
					return <JobsListCard key={job.firestoreJobId} job={job} />;
				})}
		</div>
	);

	let printJobs = jobsFiltered.length !== 0 ? jobsFound : noJobFound;

	const jobsList = (
		<div className="Jobs">
			<div className="JobsFilters">
				<SearchFilter updateSearch={updateSearchFilter} />
				<Inputs
					inputType="input"
					type="search"
					placeholder={searchMessage}
					value={search}
					handleChange={(e) => handleChange(e)}
				/>
				<JobsStatusFilter updateFilter={updateJobFilter} />
			</div>
			{printJobs}
		</div>
	);
	return jobsLength.length > 0 ? jobsList : <NoJobMessage />;
};

export default JobsList;
