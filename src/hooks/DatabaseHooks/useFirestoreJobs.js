import { useState, useEffect } from "react";
import { Firestore } from "../../config/fbConfig";

const useFirestoreJobs = (collection) => {
	const [jobs, setJobs] = useState(null);
	useEffect(() => {
		const unsubscribe = Firestore.collection(collection).onSnapshot(
			(snap) => {
				let dbJobs = [];
				snap.forEach((doc) => {
					dbJobs.push({ ...doc.data(), firestoreJobId: doc.id });
				});
				setJobs(dbJobs);
			}
		);
		return () => {
			unsubscribe();
		};
	}, [collection]);

	return { jobs };
};

export default useFirestoreJobs;
