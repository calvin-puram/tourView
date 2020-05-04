const mongoose = require('mongoose');
const chalk = require('chalk');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    // console.log(
    //   chalk.yellowBright(`connected to DB on host: ${conn.connection.host}`)
    // );
  } catch (err) {
    console.log(chalk.red(`mongoDB error: ${err.message}`));
  }
};

module.exports = connectDB;
