const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect("mongodb+srv://digy4:1234@cluster0.ipci8.mongodb.net/records?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        })

        console.log(`MongoDB connected`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;