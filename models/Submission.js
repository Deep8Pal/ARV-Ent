const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    organization: { type: String, required: false },
    selectedOptions: { type: [String], required: false },
    description: { type: String, required: false },
    address: { type: String, required: true },
    state: { type: String, required: true },
    service: { type: String, required: false },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
