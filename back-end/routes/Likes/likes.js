const express = require('express')
const router = express.Router()

const db = require('../../database/databasejs')


const getAllLikes = async (req, res, next) => {

    try {
        let pictures = await db.any('SELECT * FROM likes')

        res.json({
            status: 'success',
            message: 'retrieved all post',
            payload: pictures
        })
    } catch (error) {
        console.log(error);
    }
}
//retrieving all likes
router.get('/', getAllLikes)



const addLike = async (req, res, next) => {
    try {
        let insertQuery = `INSERT INTO likes (liker_id, photo_id) 
        VALUES($/liker_id/,$/photo_id/) RETURNING *`

        const liked = await db.one(insertQuery, req.body)

        res.json({
            message: 'image uploaded',
            payload: liked
        })

    } catch (error) {
        console.log(error);

    }
}
//adding a like to a post
router.post('/', addLike)


const deleteLike = async (req, res, next) => {
    try {
        let deletedLike = await db.one('DELETE from likes WHERE id = $1 RETURNING *', Number([req.body.liker_id]))

        res.json({
            status: 'success',
            message: 'like removed',
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
router.delete('/', deleteLike)

module.exports = router