require('dotenv').config();
const express = require('express');
const { dbConnect } = require('./config/Database');
const { appConfig } = require('./config/AppConfig');

const startServer = async () => {
  const app = express();
  // database connection
  await dbConnect();
  // App Default Config
  await appConfig(app);
};
startServer();
// https://www.youtube.com/watch?v=_FooV_onxnk&ab_channel=CodeWithDipesh