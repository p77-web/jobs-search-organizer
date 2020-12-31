import { useState, useEffect } from "react";
import { Firestore } from "../../config/fbConfig";

const useUsersCollection = (collection) => {
	const [usersCollectionRef, setUsersCollectionRef] = useState(null);

	useEffect(() => {
		const getUsersRef = async () => {
			const ref = await Firestore.collection(collection);
			setUsersCollectionRef(ref);
		};
		getUsersRef();
	}, [collection]);

	return { usersCollectionRef };
};

export default useUsersCollection;
