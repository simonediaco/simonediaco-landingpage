const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure email transporter with Aruba settings
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    // Do not fail on invalid certificates
    rejectUnauthorized: false
  },
  debug: true, // Show debug info
  logger: true // Log information about the mail
});

// Test email configuration on startup
function testEmailConfig() {
  console.log('===== TESTING EMAIL CONFIG =====');
  console.log('Host:', process.env.EMAIL_HOST);
  console.log('Port:', process.env.EMAIL_PORT);
  console.log('User:', process.env.EMAIL_USER);
  console.log('Password:', '************'); // Fully masked for security
  console.log('Recipient:', process.env.RECIPIENT_EMAIL);
  
  // Send test email
  const testMailOptions = {
    from: `"Test Email" <${process.env.EMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'Test Email from Portfolio Site',
    text: 'This is a test email to verify your email configuration is working.',
    html: '<p>This is a test email to verify your email configuration is working.</p>'
  };
  
  transporter.sendMail(testMailOptions)
    .then(info => {
      console.log('TEST EMAIL SENT SUCCESSFULLY!');
      console.log('Message ID:', info.messageId);
      console.log('===============================');
    })
    .catch(error => {
      console.error('TEST EMAIL FAILED:');
      console.error('Error Code:', error.code);
      console.error('Error Message:', error.message);
      
      if (error.code === 'EAUTH') {
        console.error('AUTHENTICATION FAILED: Check your username and password');
      } else if (error.code === 'ESOCKET' || error.code === 'ECONNECTION') {
        console.error('CONNECTION FAILED: Check your host and port settings');
      } else if (error.code === 'ETIMEDOUT') {
        console.error('CONNECTION TIMED OUT: Your email server might be blocking the connection');
      }
      console.log('===============================');
    });
}

// Verify email configuration on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
    // Run the test email if verification was successful
    // testEmailConfig();
  }
});

// Test route for email
app.get('/api/test-email', (req, res) => {
  const testMailOptions = {
    from: `"Test Email" <${process.env.EMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'Manual Test Email',
    text: 'This is a manual test email sent at ' + new Date().toString(),
    html: '<p>This is a manual test email sent at ' + new Date().toString() + '</p>'
  };
  
  transporter.sendMail(testMailOptions)
    .then(info => {
      console.log('Manual test email sent:', info.messageId);
      res.status(200).json({
        success: true,
        messageId: info.messageId
      });
    })
    .catch(error => {
      console.error('Manual test email failed:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        code: error.code
      });
    });
});

// Test form submission route
app.get('/api/test-form', (req, res) => {
  const testData = {
    name: 'Test User',
    email: process.env.RECIPIENT_EMAIL, // Send to yourself
    subject: 'Form Submission Test',
    message: 'This is a test of the form submission process at ' + new Date().toString()
  };
  
  console.log('Simulating form submission with data:', testData);
  
  const mailOptions = {
    from: `"Portfolio Contact: ${testData.name}" <${process.env.EMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Portfolio Contact: ${testData.subject}`,
    replyTo: testData.email,
    text: `
Name: ${testData.name}
Email: ${testData.email}
Subject: ${testData.subject}

Message:
${testData.message}
    `,
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
  <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Test Form Submission</h2>
  <p><strong>From:</strong> ${testData.name}</p>
  <p><strong>Email:</strong> <a href="mailto:${testData.email}">${testData.email}</a></p>
  <p><strong>Subject:</strong> ${testData.subject}</p>
  <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 4px;">
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-line;">${testData.message}</p>
  </div>
  <p style="margin-top: 20px; font-size: 12px; color: #777;">This is a test message for the form.</p>
</div>
    `
  };
  
  transporter.sendMail(mailOptions)
    .then(info => {
      console.log('Test form email sent:', info.messageId);
      res.status(200).json({
        success: true,
        message: 'Test form email sent successfully',
        messageId: info.messageId
      });
    })
    .catch(error => {
      console.error('Test form email error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    });
});

// API endpoint for contact form
app.post('/api/contact', (req, res) => {
  console.log('========== CONTACT FORM SUBMISSION ==========');
  console.log('Request body:', req.body);
  
  const { name, email, subject, message } = req.body;
  
  // Validate input
  if (!name || !email || !subject || !message) {
    console.log('Validation failed - missing fields');
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('Validation failed - invalid email format');
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }
  
  // Log the contact request
  console.log('Preparing to send email:');
  console.log('- From:', name, `(${email})`);
  console.log('- Subject:', subject);
  console.log('- To:', process.env.RECIPIENT_EMAIL);
  
  // Create email message
  const mailOptions = {
    from: `"Portfolio Contact: ${name}" <${process.env.EMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Portfolio Contact: ${subject}`,
    replyTo: email,
    text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `,
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
  <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
  <p><strong>From:</strong> ${name}</p>
  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
  <p><strong>Subject:</strong> ${subject}</p>
  <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 4px;">
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-line;">${message}</p>
  </div>
  <p style="margin-top: 20px; font-size: 12px; color: #777;">This message was sent from your portfolio website contact form.</p>
</div>
    `
  };
  
  console.log('Sending email now...');
  
  // Send email with enhanced logging
  transporter.sendMail(mailOptions)
    .then(info => {
      console.log('===== EMAIL SENT SUCCESSFULLY =====');
      console.log('Message ID:', info.messageId);
      console.log('Response:', info.response);
      
      // Success response to client
      res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully! I will get back to you soon.'
      });
      
      // Optionally send confirmation email to sender
      const confirmationMail = {
        from: `"Simone Diaco" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank you for your message',
        html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
  <h2 style="color: #333;">Thank You for Contacting Me</h2>
  <p>Hi ${name},</p>
  <p>Thank you for reaching out through my portfolio website. I have received your message and will respond as soon as possible.</p>
  <p>Best regards,</p>
  <p><strong>Simone Diaco</strong><br>Software Developer</p>
</div>
        `
      };
      
      return transporter.sendMail(confirmationMail);
    })
    .then(info => {
      if (info) {
        console.log('Confirmation email sent to', email);
      }
    })
    .catch(error => {
      console.error('===== EMAIL ERROR =====');
      console.error('Error Code:', error.code);
      console.error('Error Message:', error.message);
      console.error('Full Error:', error);
      console.error('========================');
      
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    });
});

// For all other GET requests, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Visit http://0.0.0.0:${PORT} to view the site`);
});