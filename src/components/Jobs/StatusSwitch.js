const StatusSwitch = (status) => {
	let jobStatus = "";

	switch (status) {
		case "No Answer":
			jobStatus = "NoAnswer";
			break;

		case "Interview":
			jobStatus = "Interview";
			break;

		case "Accepted":
			jobStatus = "Accepted";
			break;

		case "Refused":
			jobStatus = "Refused";
			break;

		case "No Status":
			jobStatus = "NoStatus";
			break;

		default:
			jobStatus = "";
			break;
	}
	return jobStatus;
};

export default StatusSwitch;
