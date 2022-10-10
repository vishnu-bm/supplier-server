const express = require('express');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const router = new express.Router();
const auth = require('../middleware/auth')

router.post('/register', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        const token = jwt.sign({ _id: user._id.toString() }, "Codename@47", { expiresIn: '1 day' });
        user.tokens = user.tokens.concat({ token })
        res.status(200).send({ user, token })
    } catch (err) {
        res.status(400).send()
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateToken()
        res.status(200).send({ user, token })

    } catch (err) {
        res.status(400).send()
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token = req.token
        })
        await req.user.save()
        res.status(200).send({ success: true, message: "successfully logged out" })
    } catch (err) {
        console.log(err)
        res.status(400).send()
    }
})

module.exports = router;