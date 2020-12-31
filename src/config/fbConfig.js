import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
	apiKey: "AIzaSyCev8va-yIbrUpM7PnzRRZhfEEX5qnAnEA",
	authDomain: "job-search-16.firebaseapp.com",
	databaseURL: "https://job-search-16.firebaseio.com",
	projectId: "job-search-16",
	storageBucket: "job-search-16.appspot.com",
	messagingSenderId: "290174441070",
	appId: "1:290174441070:web:8b9e4a6e4e5503f1e6f87f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const Firestore = firebase.firestore();
const filesStorage = firebase.storage();

export default firebase;
export { Firestore, filesStorage };
