var express = require('express');
var router = express.Router();
const db = require('../../database/databasejs');
const hash = require('js-sha256').sha256;

// REGISTER NEW USER
router.post('/', async (req, res, next) => {
    console.log('Login route hit')
    console.log('Request body: ', { ...req.body })
    let { username, password } = req.body
    const hashedPassword = hash(password)
    console.log(password, hashedPassword)
    const query = `SELECT * FROM users WHERE username = $1 AND password = $2`
    const data = await db.one(query, [username, hashedPassword])
    console.log('User Query response data: ', data)
    delete data.password
    // console.log('REQUEST: ', req)
    res.json({
        status: 'success',
        message: 'User logged in',
        payload: data
    })

})


module.exports = router;