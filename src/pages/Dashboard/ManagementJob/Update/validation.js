const rules = {
  name: {
    required: {
      value: true,
      message: "Please Job Name or Job Position cannot be empty.",
    },
    maxLength: {
      value: 100,
      message: "Lenght of Job Name or Job Position max 100 character.",
    },
  },

  period: {
    required: {
      value: true,
      message: "Please choose the job period start to end.",
    },
  },

  jobType: {
    required: {
      value: true,
      message: "Job Type cannot be empty."
    },
  },

  description: {
    required: {
      value: true,
      message: "Job Description cannot be empty."
    },
    maxLength: {
      value: 500,
      message: "Job Description max 500 character.",
    },
  },
};

export { rules };
