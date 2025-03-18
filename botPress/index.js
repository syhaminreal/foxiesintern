const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;  // Port for your Node.js application

// Make sure BotPress is running and replace 'localhost:3000' with your BotPress server URL if different
const botPressUrl = 'http://localhost:3000';

// Middleware to parse JSON in request bodies
app.use(express.json());

// Example route for sending a message to BotPress
app.post('/send-message', async (req, res) => {
  const { userId, message } = req.body;  // Assuming userId and message are passed in the request body

  try {
    // Make a POST request to BotPress API to converse with the bot
    const response = await axios.post(`${botPressUrl}/api/v1/bots/your-bot-id/converse/${userId}`, {
      type: 'text',
      text: message,
    });

    // Respond with the bot's message
    res.json({
      message: response.data.messages[0]?.text || 'No response from bot',
    });
  } catch (error) {
    console.error('Error interacting with BotPress:', error);
    res.status(500).send('Failed to send message');
  }
});

app.listen(port, () => {
  console.log(`Node.js app is running at http://localhost:${port}`);
});
