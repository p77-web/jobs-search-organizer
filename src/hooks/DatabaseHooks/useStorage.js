import { useState, useEffect } from "react";
import { filesStorage } from "../../config/fbConfig";

const useStorage = (file, id) => {
	const [progress, setProgress] = useState(0);
	const [url, setUrl] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const storageFilesRef = filesStorage.ref(`files/${id}/${file.name}`);

		storageFilesRef.put(file).on(
			"state_changed",
			(snap) => {
				let progress = (snap.bytesTransferred / snap.totalBytes) * 100;
				console.log(progress);
				setProgress(progress);
			},
			(err) => {
				setError(err);
			},
			async () => {
				const url = await storageFilesRef.getDownloadURL();
				console.log(url);
				setUrl(url);
			}
		);
	}, [file, id]);

	return { progress, url, error };
};

export default useStorage;
