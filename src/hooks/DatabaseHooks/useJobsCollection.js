import { useState, useEffect } from "react";
import { Firestore } from "../../config/fbConfig";

const useJobsCollection = (collection) => {
	const [jobsCollectionRef, setJobsCollectionRef] = useState(null);

	useEffect(() => {
		const getJobsRef = async () => {
			let ref = null;
			try {
				ref = await Firestore.collection(collection);
			} catch (err) {
				console.log("Error: ", err);
			}
			setJobsCollectionRef(ref);
		};
		getJobsRef();
	}, [collection]);

	return { jobsCollectionRef };
};

export default useJobsCollection;
