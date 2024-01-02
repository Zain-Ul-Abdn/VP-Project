const { usersCollection } = require("../../Database/Model");

const user = async (req, res) => {

    try {
        const { email, password } = req.body
        await usersCollection.create({
            userEmail: query,
            userPass: response
        });
        res.status(200).json({ email, password })
    } catch (error) {
        res.status(500).json({error:"Unable to create users"})
    }
}

module.exports = {user}