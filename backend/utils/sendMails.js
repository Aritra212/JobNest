import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOTP = (email, subject, text) => {
  const d = Date.now();
  const otp = (Math.floor(d / 1000000) + (d % 1000000)) % 1000000;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject,
    text: `${text} Your OTP is - ${otp}`,
  };

  // Return a promise to handle the async behavior
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return reject({
          success: false,
          message: `Mail sending error! mail id - ${email}`,
        });
      } else {
        return resolve({
          success: true,
          message: `OTP sent to ${email}`,
          otp,
        });
      }
    });
  });
};

export { sendOTP };
