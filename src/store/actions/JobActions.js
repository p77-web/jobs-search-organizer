import { jobsFirestore } from "../../config/fbConfig";

export const newJob = (job) => {
	return (dispatch, getState) => {
		// getting the profile
		const profile = getState().firebase.profile;
		const ownerId = getState().firebase.auth.uid;

		// create an object which keeps all job input elements
		const jobData = {};

		for (const id in job.jobForm) {
			// add job object input values to the new object by id
			jobData[id] = job.jobForm[id].value;
		}

		// delete jobForm key bcs I don't want it to be added to the db
		delete job.jobForm;
		// add jobData object to the job object
		job = { ...job, ...jobData };

		jobsFirestore
			.collection("jobs")
			.add({
				...job,
				owner: profile.userFullName,
				ownerId,
			})
			.then(() => {
				dispatch({ type: "NEW_JOB_SUCCESS", job });
			})
			.catch((err) => {
				dispatch({ type: "NEW_JOB_ERR", err });
			});
	};
};

export default newJob;
