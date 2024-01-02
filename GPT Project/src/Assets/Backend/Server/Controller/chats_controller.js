const { chatsCollection } = require('../../Database/Model')

const chat = async (req, res) => {

    try {
        const { query, response } = req.body
        await chatsCollection.create({
            userChat: query,
            gptResponse: response
        });
        res.status(200).json({ query, response })
    } catch (error) {
        res.status(500).json({error:"Unable to create gptResponse"})
    }
}

const fetchQueries = async (req, res) => {
    try {
        const queries = await chatsCollection.find();
        res.status(200).json({ queries });
    }
    catch (error) {
        res.status(500).json({ error: "Unable to find any chats" });
    }
}

//Fetch gptResponse from user_query
const fetchResponse = async (req, res) => {
    try 
    {
        const userquery = req.params.query;
        const userData = await User.findById({ userChat: userquery });
        res.status(200).json({ userData });
    } 
    catch (error) 
    {
        res.status(500).json({ error: "This query is not asked yet." });
    }
};

module.exports = {
    chat,
    fetchQueries,
    fetchResponse
};
