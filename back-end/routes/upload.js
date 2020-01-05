var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/upload', (req, res, next) => {
    console.log('req.file', req.file);

    let imageUrl = "http://localhost:8080/" + req.file.path.replace('public/', '')

    res.json({
        message: 'image uploaded',
        imageUrl: imageUrl
    })

})

module.exports = router;
