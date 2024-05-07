import nodemailer from "nodemailer";
// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL, // Your Gmail email address
    pass: process.env.PASSWORD, // Your Gmail password or app password
  },
  // // host: "smtp.mail.yahoo.com",
  // // port: 465,
  // service: "yahoo",
  // auth: {
  //   user: process.env.EMAIL,
  //   pass: process.env.PASSWORD,
  // },
});

export const Email = async (user, password) => {
  const emailHTML = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #0056b3;">Password Reset Request</h2>
      <p>You have requested a password reset for your account.</p>
      <p><strong>Your temporary password is:</strong> <span style="font-size: 16px; color: #d63384;">${password}</span></p>
      <p>This temporary password is valid for <strong>10 minutes</strong>.</p>
      <p>Please use this password to login and reset your permanent password.</p>
      <p>If you did not request this change, please contact our support immediately.</p>
      <hr style="border: none; border-bottom: 1px solid #ccc; margin-top: 20px;">
      <footer style="text-align: center; margin-top: 20px;">
        <p style="color: #888;">This is an automated message, please do not reply.</p>
      </footer>
    </div>
  `;
  const emailHTML2 = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
      <h2 style="color: #0056b3;">Your Temporary Password</h2>
      <p style="color: #555;">You have requested a password reset for your account.</p>
      <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd; display: inline-block;">
        <p><strong>Your temporary password is:</strong></p>
        <p style="background: #ebf4ff; border-left: 5px solid #0056b3; padding: 10px; font-size: 18px; color: #d63384; margin: 10px 0;">${password}</p>
        <p>Please use this password to log in promptly. This password is valid for <strong>10 minutes</strong>.</p>
        <p><strong>Important:</strong> Once logged in, please change your password immediately to ensure your account remains secure and you have access in the future.</p>
      </div>
      <p>If you did not request this change, please contact our support immediately.</p>
      <hr style="border: none; border-top: 1px solid #ccc; margin-top: 20px; width: 80%;">
      <footer style="text-align: center; margin-top: 20px; color: #888;">
        <p>This is an automated message, please do not reply.</p>
      </footer>
    </div>
  `;

  try {
    // Define email options
    await transporter.sendMail({
      from: "fashFlash <no-reply@example.com>", // Sender address
      to: user.email, // List of receivers
      subject: "Temporary Password Reset", // Subject line
      html: emailHTML2, // HTML content
    });
  } catch (error) {
    throw error;
  }
};
export const sendVerificationCode = async (user, code) => {
  try {
    await transporter.sendMail({
      from: "fashFlash <no-reply@example.com>", // process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Email Verification Code",
      html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #0056b3;">Email Verification Code</h2>
      <p>Your verification code is:</p>
      <p style="font-size: 24px; font-weight: bold; color: #d63384;">${code}</p>
      <p>This code is valid for <strong>10 minutes</strong>.</p>
      <p>Please use this code to verify your email address.</p>
      <hr style="border: none; border-bottom: 1px solid #ccc; margin-top: 20px;">
      <footer style="text-align: center; margin-top: 20px;">
        <p style="color: #888;">This is an automated message, please do not reply.</p>
      </footer>
    </div>
  `,
    });
  } catch (error) {
    throw error;
  }
};
export const sendEmailWithInvoice = async (user, link) => {
  try {
    // Setup email data
    /*let mailOptions = {
      from: '"fashFlash" <no-reply@yourcompany.com>', // Sender address
      to: user.email, // Recipient email from user object
      subject: "Your Invoice for Recent Purchase - fashFlash",
      html: `
        <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; line-height: 1.5; font-size: 16px; color: #333;">
          <h2 style="color: #0046be;">Thank you for your purchase!</h2>
          <p>Dear ${user.name},</p>
          <p>We appreciate your business and are pleased to confirm your recent transaction with us. Attached below is the link to your invoice, detailing your purchase information:</p>
          <p><a href="${link}" style="background-color: #0046be; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Your Invoice</a></p>
          <p>If you have any questions or need further assistance, please do not hesitate to contact our customer service team.</p>
          <p>Thank you for choosing <strong>fashFlash</strong>!</p>
          <p>Warm regards,<br>Your Company Team</p>
        </div>
      `,
    };*/
    let mailOptions = {
      from: '"fashFlash" <no-reply@example.com>', // Sender address
      to: user.email, // Recipient email from user object
      subject: "Your Invoice from fashFlash",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333; max-width: 600px; margin: auto; border: 1px solid #eeeeee; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <header style="border-bottom: 1px solid #eeeeee; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="font-size: 24px; color: #0046be;">Invoice Available</h1>
          </header>
          <section style="font-size: 16px; line-height: 1.5;">
            <p>Hello <strong>${user.name}</strong>,</p>
            <p>Thank you for your recent purchase. We are pleased to provide you with the invoice for your transaction.</p>
            <p>Please find your invoice at the link below:</p>
            <p><a href="${link}" style="display: inline-block; font-size: 16px; background-color: #0046be; color: white; text-decoration: none; padding: 10px 15px; border-radius: 5px; font-weight: bold;">View Invoice</a></p>
            <p>If you require any further assistance or have any questions, please do not hesitate to reach out directly by replying to this email.</p>
          </section>
          <footer style="border-top: 1px solid #eeeeee; padding-top: 20px; margin-top: 20px;">
            <p>Kind regards,</p>
            <p><strong>fashFlash</strong><br>Customer Service Team</p>
          </footer>
        </div>
      `,
    };
    // Function call to send the email (This depends on the service/library you're using, e.g., nodemailer)
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

// Assuming 'lineItems' contains the products and their details
