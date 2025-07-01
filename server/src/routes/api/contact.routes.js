import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, organization, email, message } = req.body;

  // Configure your transporter (use environment variables for real credentials)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.CONTACT_EMAIL_USER,
      pass: process.env.CONTACT_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.CONTACT_EMAIL_TO, // your email address
    subject: `Contact Form Submission from ${name}`,
    text: `Organization: ${organization}\nEmail: ${email}\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${process.env.CONTACT_EMAIL_TO} from ${email}`);
    res.status(200).json({ message: 'Email sent' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ message: 'Failed to send email', error: err.message });
  }
});

export default router;