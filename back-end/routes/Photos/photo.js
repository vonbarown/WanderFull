const express = require('express')
const router = express.Router()

/* GET home page. */
router.post('/', (req, res, next) => {
    console.log('req.file', req.file)

    try {
        let imageUrl = "http://localhost:8080/" + req.file.path.replace('public/', '')

        res.json({
            message: 'image uploaded',
            imageUrl: imageUrl
        })
    } catch (error) {
        console.log(error)



    }

})

router.get('/', (req, res, next) => {
    // console.log('req.file', req.file)
    res.send('hello')

})


module.exports = router;
