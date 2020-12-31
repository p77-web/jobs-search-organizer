const initialState = {};

const JobReducer = (state = initialState, action) => {
	switch (action.type) {
		case "NEW_JOB_SUCCESS":
			return state;
		case "NEW_JOB_ERR":
			console.log("New job error", action.err);
			return state;
		default:
			return state;
	}
};

export default JobReducer;
