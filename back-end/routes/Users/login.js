var express = require('express');
var router = express.Router();
const db = require('../../database/databasejs');

// LOG IN USER
router.post('/', async (req, res, next) => {
    const { username } = req.body
    console.log('Login route hit')
    console.log('Request username:', username)

    const query = `
        SELECT * FROM users
        WHERE username = $1
    `

    try {
        const data = await db.one(query, [username])
        console.log('User Query response data: ', data)
        delete data.password
        res.json({
            status: 'success',
            message: 'User logged in',
            payload: data
        })
    } catch (err2) {
        console.error('DB error', '\n', err2)
        console.log('User not logged in')
        res.json({
            status: 'failed',
            message: 'User not created',
            payload: err
        })
    }
})

module.exports = router;