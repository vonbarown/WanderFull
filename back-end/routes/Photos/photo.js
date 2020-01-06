const express = require('express')
const router = express.Router()

const db = require('../../database/databasejs')


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
//adding posts 
router.post('/', addPic)


const getPics = async (req, res, next) => {
    try {
        let pictures = await db.any('SELECT * FROM posts')

        res.json({
            status: 'success',
            message: 'retrieved all post',
            payload: pictures
        })
    } catch (error) {
        console.log(error);
    }
}
//retrieving all posts
router.get('/', getPics)


const deletePhoto = async (req, res, next) => {
    try {
        let deletedPhoto = await db.one('DELETE from posts WHERE id = $1 RETURNING *', Number([req.body.id]))

        res.json({
            status: 'success',
            message: 'image deleted',
            payload: deletedPhoto
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failure',
            message: 'you can\'t perform this operation'
        })
    }
}

//delete pictures
router.delete('/', deletePhoto)

module.exports = router;
