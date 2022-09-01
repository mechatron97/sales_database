const mongoose = require("mongoose");

const connectDB = () => {
  try {
    // mongodb connection string
    // eslint-disable-next-line no-unused-vars
    const con = mongoose.connect("mongodb+srv://digy4:1234@cluster0.ipci8.mongodb.net/records?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
