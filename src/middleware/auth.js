const jwt = require('jsonwebtoken');
const User = require('../models/users');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        decoded = jwt.verify(token, 'Codename@47');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error("no user found")
        }
        req.token = token
        req.user = user
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
        // res.header('Access-Control-Allow-Headers: *');
        // res.header('Access-Control-Max-Age: 1728000');
        // res.header("Content-Length: 0");
        // res.header("Content-Type: text/plain");
        next()
    } catch (err) {
        res.send({ error: "not authorised" })
        next()
    }
}

module.exports = auth