const express = require('express');
const router = express.Router();
const db = require('../../database/databasejs');

// LOGOUT USER
router.post('/', async (req, res, next) => {
    const { username } = req.body
    console.log('Logout route hit')
    console.log('Request username:', username)

    res.json({
        status: 'success',
        message: 'User logged out',
        payload: {}
    })

})

module.exports = router;