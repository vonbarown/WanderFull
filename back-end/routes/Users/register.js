var express = require('express');
var router = express.Router();
const db = require('../../database/databasejs');
const hash = require('js-sha256').sha256;

// REGISTER NEW USER
router.post('/', async (req, res, next) => {
    console.log('Signup Route hit', req.body)

    const { username, password, firstname, lastname, email } = req.body
    const hashedPassword = hash(password)

    const query = `
        INSERT INTO users (username, password, firstname, lastname, email) 
        values (
        $1, $2, $3, $4, $5
        ) 
    `
    try {
        const data = await db.any(query, [username, hashedPassword, firstname, lastname, email])
        console.log(data)
        console.log('User Created')
        res.json({
            status: 'success', 
            message: 'User created',
            payload: { username, firstname, lastname, email }
        })
    } catch (err) {
        console.error(err)
        console.log('User not created')
        res.json({
            status: 'failed', 
            message: 'User not created',
            payload: err
        })
    }
})


module.exports = router;