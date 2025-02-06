import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

// Function to generate a 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Creating the transporter object
const transporter = nodemailer.createTransport({
    service: "gmail", // Use other services like Outlook, Yahoo, etc.
    auth: {
        user: process.env.EMAIL_USER, // Use environment variables
        pass: process.env.EMAIL_PASS, // App Password for security
    },
});

// Function to send OTP email
const sendOTP = async (recipientEmail) => {
    try {
        const otp = generateOTP();

        // Define mail options
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender email
            to: recipientEmail, // Receiver email
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log("OTP sent:", info.response);

        return otp; // Return OTP for verification
    } catch (error) {
        console.error("Error sending OTP:", error);
        return null;
    }
};

// Example usage
sendOTP("recipient@example.com").then((otp) => {
    if (otp) {
        console.log("Generated OTP:", otp);
    }
});

//export { sendOTP };
