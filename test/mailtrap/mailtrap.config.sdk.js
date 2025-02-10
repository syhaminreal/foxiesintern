import  { MailtrapClient } from "mailtrap";
import dotenv  from "dotenv";

dotenv.config()

export const MailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_ENDPOINT, endpoint: process.env.MAILTRAP_TOKEN
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "sam ",
};
// const recipients = [
//   {
//     email: "shyaminreallife@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     html: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);