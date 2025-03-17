const { default: mongoose } = require('mongoose');

let dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/auth_project';

exports.dbConnect = async () => {
  return await mongoose
    .connect(dbUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('MongoDB Connection Error:', error));
};
