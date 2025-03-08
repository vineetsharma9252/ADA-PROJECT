const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDD connected sucessfully");
    }catch (error) {
        console.error("Error connecting to mongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB ;