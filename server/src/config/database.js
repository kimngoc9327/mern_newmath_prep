const mongoose = require("mongoose");

async function connect() {
  try {
    let connection = await mongoose.connect(process.env.DB_URL);
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect successfully");
  }
}

module.exports = connect;
