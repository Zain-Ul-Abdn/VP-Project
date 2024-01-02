const { usersCollection, chatsCollection } = require("./Model");

const InsertUser = () => {
    usersCollection.create({
        firstName: 'Zain',
        lastName: 'Khan',
        userEmail: 'zaini@gmail.com',
        userPass: '1234'
    });
};

const InsertChats = async (user_query, boot_response) => {
    await chatsCollection.create({
        userChat: user_query,
        gptResponse: boot_response
    });

    console.log("Data Inserted");
};


module.exports = { InsertUser, InsertChats };
