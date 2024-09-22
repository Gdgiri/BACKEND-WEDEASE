

import nodemailer from "nodemailer";


export const sendEmail = async (options) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.PASSMAIL, 
      pass: process.env.PASSKEY, 
    },
  });

  // Define the email options
  const mailOptions = {
    from: process.env.PASSMAIL, // Your email address
    to: options.to, // Recipient email address
    subject: options.subject, // Email subject
    text: options.text, // Email content
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
