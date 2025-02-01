const mongoose = require('mongoose');
require('dotenv').config();

// const localMongoURL = "mongodb://127.0.0.1:27017/recipe";
const mongoURL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
      await mongoose.connect(mongoURL);
      console.log('Connected to MongoDB server');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
  };
  
  // Export the connectDB function
  module.exports = connectDB;

// const mongoose = require('mongoose');
// require('dotenv').config();

// const mongoURL = process.env.MONGO_URL;

// const connectDB = async () => {
//     try {
//         await mongoose.connect(mongoURL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('Connected to MongoDB server');
//     } catch (err) {
//         console.error('MongoDB Connection Error:', err.message);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;
