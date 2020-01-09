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
router.get('/all', getAllLikes)



const addLike = async (req, res, next) => {
    try {
        let insertQuery = 
        `INSERT INTO likes (liker_id, photo_id) 
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
router.post('/add', addLike)


const deleteLike = async (req, res, next) => {
    try {
        let deletedLike = await db.one(
        `DELETE from likes 
         WHERE post_id = $1 
         AND liker_id = $2 RETURNING *`, [req.params.post_id, req.params.liker_id])

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

//delete like on a post
router.delete('/unlike/:post_id/:liker_id', deleteLike)


const getLikesOnPost = async (req, res, next) => {
    try {
        let numOfLikes = await db.any('SELECT * FROM likes WHERE post_id = $1', Number([req.params.post_id]))

        res.json({
            status: 'success',
            message: 'received number of likes',
            payload: numOfLikes
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failure',
            message: 'you can\'t perform this operation'
        })
    }
}

// get all likes on a post
router.get('/:post_id', getLikesOnPost)


module.exports = router