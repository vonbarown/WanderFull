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
router.post('/add', addLike)


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
router.delete('/unlike', deleteLike)

const getNumOfLikes = async (req, res, next) => {
    try {
        let numOfLikes = await db.any('SELECT COUNT(*) from likes WHERE photo_id = $1', Number([req.params.photo_id]))

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

// change to get all likes on a posts, well count # of likes in front end 
//get number of likes on a post
router.get('/:photo_id', getNumOfLikes)


module.exports = router