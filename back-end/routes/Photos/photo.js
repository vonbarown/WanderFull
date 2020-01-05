const express = require('express')
const router = express.Router()

const { db } = require('../../database/databasejs')


const addPic = async (req, res, next) => {
    console.log('req.file', req.file)
    try {
        let imageUrl = "http://localhost:8080/" + req.file.path.replace('public/', '')
        let insertQuery = `INSERT INTO posts (user_id, img, caption,hashtag) 
        VALUES($/user_id/, $/imageUrl/,$/caption/,$/hashtag/)`

        let bodyCopy = Object.assign({}, req.body)
        bodyCopy.imageUrl = imageUrl

        await db.none(insertQuery, bodyCopy)

        res.json({
            message: 'image uploaded',
            imageUrl: imageUrl
        })
    } catch (error) {
        console.log(error)
    }
}
router.post('/', addPic)

const getPics = async (req, res, next) => {

    let pictures = await db.any('SELECT * FROM posts')

    res.json({
        status: 'success',
        message: 'retrieved all post',
        payload: pictures
    })
}

router.get('/', getPics)


module.exports = router;
