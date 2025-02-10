import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

// Initialize MailtrapClient with correct environment variables
export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN, // Corrected environment variable name
  endpoint: process.env.MAILTRAP_ENDPOINT, // Corrected environment variable name
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "sam ",
};

// Example usage of the client
// const recipients = [
//   {
//     email: "shyaminreallife@gmail.com",
//   }
// ];

// mailtrapClient
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     html: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
