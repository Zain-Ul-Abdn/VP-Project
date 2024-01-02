const express = require('express');
const mongoCon = require('../Database/Config')
const cors = require('cors')
const PORT = 5000

const app = express()
const router = require("./router/gpt-router")

app.use(cors())
app.use(express.json())

app.use('/api/gpt', router);

mongoCon().then(() => {
    app.listen(PORT)
    console.log(` Server is runnin at: http://localhost:${PORT}/api/gpt`)
    }
).catch(e => console.log("Unable to run server\n",e))