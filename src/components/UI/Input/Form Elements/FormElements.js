const addJobFormElements = {
	// company
	companyName: {
		elType: "input",
		elConfig: {
			type: "text",
			labelText: "Company Name",
			helperText: "",
		},
		value: "",
		elValidation: {
			required: true,
		},
		valid: false,
	},
	address: {
		elType: "input",
		elConfig: {
			type: "text",
			labelText: "Company Address",
			helperText: "",
		},
		value: "",
		elValidation: {
			required: true,
		},
		valid: false,
	},
	industry: {
		elType: "input",
		elConfig: {
			type: "text",
			labelText: "Industry",
			helperText: "",
		},
		value: "",
		elValidation: {
			required: true,
		},
		valid: false,
	},
	url: {
		elType: "input",
		elConfig: {
			type: "text",
			labelText: "Link",
			helperText: "www.example.com",
		},
		value: "",
		elValidation: {
			required: true,
			urlPattern: true,
		},
		valid: false,
		touched: false,
	},
	companyDescription: {
		elType: "textarea",
		elConfig: {
			type: "",
			labelText: "Company description",
			helperText: "",
			rows: "3",
		},
		value: "",
		elValidation: {
			required: false,
		},
		valid: true,
	},
	// job
	jobName: {
		elType: "input",
		elConfig: {
			type: "text",
			labelText: "Job Name",
			helperText: "",
		},
		value: "",
		elValidation: {
			required: true,
		},
		valid: false,
	},
	date: {
		elType: "input",
		elConfig: {
			type: "date",
			labelText: "",
			max: new Date().toISOString().slice(0, 10),
		},
		value: "",
		elValidation: {
			required: true,
		},
		valid: false,
	},
	foundOn: {
		elType: "input",
		elConfig: {
			type: "text",
			labelText: "Found On",
			helperText: "",
		},
		value: "",
		elValidation: {
			required: true,
		},
		valid: false,
	},
	appliedOn: {
		elType: "input",
		elConfig: {
			type: "text",
			labelText: "Applied On",
			helperText: "",
		},
		value: "",
		elValidation: {
			required: true,
		},
		valid: false,
	},
	jobDescription: {
		elType: "textarea",
		elConfig: {
			type: "",
			labelText: "Job description",
			helperText: "",
			rows: "3",
		},
		value: "",
		elValidation: {
			required: false,
		},
		valid: true,
	},
	documents: {
		elType: "input",
		elConfig: {
			type: "file",
			// accept: ".doc,.docx,.pdf",
			multiple: "multiple",
		},
		value: "",
		elValidation: {
			required: false,
		},
		valid: true,
	},
};

const addFollowUpFormElements = {
	// contact
	contactName: {
		elType: "input",
		elConfig: {
			type: "text",
			labelText: "Contact Name",
			helperText: "",
		},
		value: "",
		elValidation: {
			required: false,
		},
		valid: false,
	},
	contactTitle: {
		elType: "input",
		elConfig: {
			type: "text",
			labelText: "Contact Title",
			helperText: "",
		},
		value: "",
		elValidation: {
			required: false,
		},
		valid: false,
	},
	contactPhone: {
		elType: "input",
		elConfig: {
			type: "tel",
			labelText: "Contact Phone",
			helperText: "123-456-7890",
		},
		value: "",
		elValidation: {
			required: false,
			phonePattern: true,
		},
		valid: false,
	},
	contactEmail: {
		elType: "input",
		elConfig: {
			type: "email",
			labelText: "Contact Email",
			helperText: "example@test.com",
		},
		value: "",
		elValidation: {
			required: false,
			emailPattern: true,
		},
		valid: false,
	},
	contactDate: {
		elType: "input",
		elConfig: {
			type: "date",
			labelText: "",
			min: "",
			max: "",
		},
		value: "",
		elValidation: {
			required: false,
		},
		valid: false,
	},
	// interview
	interviewerName: {
		elType: "input",
		elConfig: {
			type: "text",
			labelText: "Name(s)",
			helperText: "",
		},
		value: "",
		elValidation: {
			required: false,
		},
		valid: false,
	},
	interviewerPosition: {
		elType: "input",
		elConfig: {
			type: "text",
			labelText: "Position",
			helperText: "",
		},
		value: "",
		elValidation: {
			required: false,
		},
		valid: false,
	},
	interviewType: {
		elType: "input",
		elConfig: {
			type: "text",
			labelText: "Interview Type",
			helperText: "",
		},
		value: "",
		elValidation: {
			required: false,
		},
		valid: false,
	},
	interviewDate: {
		elType: "input",
		elConfig: {
			type: "date",
			labelText: "",
		},
		value: "",
		elValidation: {
			required: false,
		},
		valid: false,
	},
	observations: {
		elType: "textarea",
		elConfig: {
			type: "",
			labelText: "Observations",
			helperText: "",
			rows: "3",
		},
		value: "",
		elValidation: {
			required: false,
		},
		valid: true,
	},
};

const signUpFormElements = {
	firstName: {
		elType: "input",
		elConfig: {
			type: "text",
			labelText: "First Name",
		},
		value: "",
		elValidation: {
			required: true,
		},
		valid: false,
		touched: false,
	},
	lastName: {
		elType: "input",
		elConfig: {
			type: "text",
			labelText: "Last Name",
		},
		value: "",
		elValidation: {
			required: true,
		},
		valid: false,
		touched: false,
	},
	email: {
		elType: "input",
		elConfig: {
			type: "email",
			labelText: "Email",
			helperText: "example@test.com",
		},
		value: "",
		elValidation: {
			required: true,
			emailPattern: true,
		},
		valid: false,
		touched: false,
	},
	password: {
		elType: "input",
		elConfig: {
			type: "password",
			labelText: "Password",
			helperText:
				"Between 6 and 8 characters, at least one lowercase letter, one uppercase letter, one numeric digit",
		},
		value: "",
		elValidation: {
			required: true,
			minLength: 6,
			maxLength: 8,
			passwordPattern: true,
		},
		valid: false,
		touched: false,
	},
};

const signInFormElements = {
	email: {
		elType: "input",
		elConfig: {
			type: "email",
			labelText: "Email",
			helperText: "example@test.com",
		},
		value: "",
		elValidation: {
			required: true,
			emailPattern: true,
		},
		valid: false,
		touched: false,
	},

	password: {
		elType: "input",
		elConfig: {
			type: "password",
			labelText: "Password",
			helperText:
				"Between 6 and 8 characters, at least one lowercase letter, one uppercase letter, one numeric digit",
		},
		value: "",
		elValidation: {
			required: true,
			minLength: 6,
			maxLength: 8,
			passwordPattern: false,
		},
		valid: false,
		touched: false,
	},
};

const FormElements = {
	addJobFormElements,
	addFollowUpFormElements,
	signUpFormElements,
	signInFormElements,
};

export default FormElements;
