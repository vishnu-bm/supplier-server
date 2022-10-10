const express = require('express');
const cors = require('cors');
require('./db/database');
const usersRouter = require("./routes/users");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors())
app.use(usersRouter)

app.listen(port, () => {
    console.log('listening on port ' + port)
});