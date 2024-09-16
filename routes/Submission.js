const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");
const nodemailer = require("nodemailer");

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/submit-form", async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      organization,
      selectedOptions,
      description,
      address,
      state,
      service,
    } = req.body;

    // Save form data to MongoDB
    const newSubmission = new Submission({
      name,
      mobile,
      email,
      organization,
      selectedOptions,
      description,
      address,
      state,
      service,
    });
    await newSubmission.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject: "New Form Submission from ARV Web",
      text: `
        Name: ${name}
        Mobile Number: ${mobile}
        Email ID: ${email}
        Organization Name: ${organization}
        Service: ${service}
        Selected Options: ${selectedOptions.join(", ")}
        Address: ${address}
        State: ${state}
        Description: ${description}
      `,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Form submitted and saved successfully!" });
  } catch (error) {
    console.error("Error processing form submission:", error);
    res.status(500).json({ message: "Failed to process form submission." });
  }
});

module.exports = router;
