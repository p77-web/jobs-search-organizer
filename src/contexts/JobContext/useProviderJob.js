import firebase, { filesStorage } from "../../config/fbConfig";
import useJobsCollection from "../../hooks/DatabaseHooks/useJobsCollection";
import useUsersCollection from "../../hooks/DatabaseHooks/useUsersCollection";
require("firebase/database");

const useProviderJob = () => {
	const { jobsCollectionRef } = useJobsCollection("jobs");
	const { usersCollectionRef } = useUsersCollection("users");

	let jobId = "";
	const getId = (id) => {
		return (jobId = id);
	};

	const addNewJob = (
		companyName,
		address,
		industry,
		url,
		companyDescription,
		jobName,
		date,
		foundOn,
		appliedOn,
		jobDescription,
		doc_checkboxes,
		type_checkboxes,
		history,
		files,
		userId
	) => {
		usersCollectionRef
			.doc(userId)
			.get()
			.then((doc) => {
				jobsCollectionRef
					.add({
						companyName,
						address,
						industry,
						url: "https://" + url,
						companyDescription,
						jobName,
						date,
						foundOn,
						appliedOn,
						jobDescription,
						doc_checkboxes,
						type_checkboxes,
						owner: doc.data().userFullName,
						ownerId: userId,
						contactName: "",
						contactTitle: "",
						contactPhone: "",
						contactEmail: "",
						contactDate: "",
						interviewerName: "",
						interviewerPosition: "",
						interviewType: "",
						interviewDate: "",
						observations: "",
						status: "No Status",
					})
					.then((docRef) => {
						getId(docRef.id);
					})
					.then(() => {
						usersCollectionRef
							.doc(userId)
							.get()
							.then(() => {
								const jobsDB = jobsCollectionRef.doc(jobId);
								let fileNameValue = [];
								if (files) {
									fileNameValue = Object.values(files);
								}
								fileNameValue.map(async (file) => {
									try {
										const storageFilesRef = await filesStorage.ref(
											`files/${jobId}/${file.name}`
										);

										const task = await storageFilesRef.put(
											file
										);
										const url = await task.ref.getDownloadURL();
										jobsDB.update({
											files: firebase.firestore.FieldValue.arrayUnion(
												{
													name: file.name,
													url: url,
												}
											),
										});
									} catch (error) {
										console.log(error);
									}
									return file;
								});
							});
					})
					.then(() => {
						history.push("/jobs");
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateJob = (key, value, id) => {
		jobsCollectionRef
			.doc(id)
			.update({
				[key]: value,
			})
			.then(() => {
				console.log("Job updated!");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	/**
	 * Delete a file by name associated with a job from Firebase Storage
	 *
	 * @param {string} id
	 * @public
	 */
	const deleteAFile = (id, name) => {
		jobsCollectionRef
			.doc(id)
			.get()
			.then((docs) => {
				const files = jobsCollectionRef.doc(id);
				const filesArray = docs.data().files;
				let filteredFiles = filesArray.filter(
					(file) => file.name !== name
				);
				files.set({ files: filteredFiles }, { merge: true });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	/**
	 * Delete all files from Firebase Storage associated with a job
	 *
	 * @param {string} id
	 * @public
	 */
	const deleteAllFiles = async (id) => {
		let deletedFiles = null;
		try {
			const filesRef = await filesStorage.ref();
			deletedFiles = await filesRef.child(`files/${id}`);
		} catch (error) {
			console.log(error);
		}
		deletedFiles
			.listAll()
			.then((res) => {
				res.items.forEach((file) => {
					file.delete();
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	/**
	 * Delete a job by id from Firestore Database
	 *
	 * @param {string} id
	 * @public
	 */
	const deleteJob = (id) => {
		deleteAllFiles(id);
		jobsCollectionRef
			.doc(id)
			.delete()
			.then(function () {
				console.log("Job deleted!");
			})
			.catch(function (err) {
				console.error(err);
			});
	};

	return { addNewJob, updateJob, deleteJob, deleteAFile };
};

export default useProviderJob;
