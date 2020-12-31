import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StatusSwitch from "../../Jobs/StatusSwitch";
import { JobContext } from "../../../contexts/JobContext/JobContext";
import "./JobsListCard.css";

const JobsListCard = ({ job }) => {
	const { deleteJob } = useContext(JobContext);

	/**
	 * Delete a job
	 *
	 * @param {string} id
	 * @public
	 */
	const deleteAJob = (id) => {
		deleteJob(id);
	};
	const jobContainerTheme = [];
	let jobStatus = StatusSwitch(job.status);

	jobContainerTheme.push("Card", jobStatus);
	return (
		<div className={jobContainerTheme.join(" ")}>
			<h6 className="JobHeading">{job.companyName}</h6>
			<p className="JobParagraph">{job.jobName}</p>
			<div className="Wave"></div>
			<div className="JobButtons">
				<Link
					to={{
						pathname: `/job/${job.firestoreJobId}`,
						state: job,
					}}
					key={job.firestoreJobId}
				>
					<button className="JobIcon">More...</button>
				</Link>
				<button
					className="DeleteJobIcon"
					onClick={() => deleteAJob(job.firestoreJobId)}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default JobsListCard;
