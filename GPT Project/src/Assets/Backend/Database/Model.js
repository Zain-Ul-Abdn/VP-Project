const mongoose = require("mongoose");

//Authenticated_Users Collection Schema
const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPass: { 
        type: String,
        required: true
    }
});

//GPT_Chats collection Schema
const chatSchema = new mongoose.Schema({
    userChat :{
        type : String,
        required:true
    },
    gptResponse : {
        type : String,
        required:true
    }
});

const usersCollection = mongoose.model('Authenticated_Users', userSchema);
const chatsCollection = mongoose.model('GPT_Chats', chatSchema);

module.exports = {usersCollection, chatsCollection};