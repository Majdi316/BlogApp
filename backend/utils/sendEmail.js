const nodemailer = require("nodemailer");

module.exports = async (userEmail, subject, htmlTemplate) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "majdioa7sh@gmail.com",

      pass: "lddvfkcuaimhdhdz",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `majdioa7sh@gamil.com`,
    to: userEmail,
    subject: subject,
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      // Implement more robust error handling here (e.g., notify admins)
      return true;
    } else {
      console.log("Email sent:", info.response);
      return false;
    }
  });
};
