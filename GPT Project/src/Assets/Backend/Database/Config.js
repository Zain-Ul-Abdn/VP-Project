const mongoose = require("mongoose");
const mongoUrl = "mongodb://127.0.0.1:27017/GPT_Database";

const mongoCon = async () => {
    try {
        await mongoose.connect(mongoUrl);

        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};



module.exports = mongoCon;
