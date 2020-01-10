var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../database/databasejs');

// REGISTER NEW USER
router.post('/', (req, res, next) => {
    console.log('Signup Route hit')
    console.log('Request body...', { ... req.body })

    if (!Object.keys(req.body).length) {
        console.log('Request body is empty')
        res.json({
            status: 'failed',
            message: 'Request body is empty',
            payload: null
        })
    }

    const { username, password, firstname, lastname, email } = req.body

    bcrypt.hash(password, 10, async (err, hash) => {
        console.log(hash)
        if (err) {
            console.log('Hashing error', err)
            res.json({
                state: 'failed',
                message: 'Something went wrong, try again.'
            })
        } else {
            const query = `
                INSERT INTO users (username, password, firstname, lastname, email) 
                VALUES ( $1, $2, $3, $4, $5 ) 
            `
            try {
                const data = await db.any(query, [username, hash, firstname, lastname, email])
                console.log(data)
                console.log('User Created')
                res.json({
                    status: 'success',
                    message: 'User created',
                    payload: { username, firstname, lastname, email }
                })
            } catch (err) {
                console.error('DB error', '\n', err)
                console.log('User not created')
                res.json({
                    status: 'failed',
                    message: 'User not created',
                    payload: err
                })
            }
        }
    })
})


module.exports = router;