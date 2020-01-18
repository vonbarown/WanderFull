const express = require('express')
const router = express.Router()

const db = require('../../database/databasejs')


const getAllLikes = async (req, res, next) => {

    try {
        let likes = await db.any('SELECT * FROM likes')

        res.json({
            status: 'success',
            message: 'retrieved all likes',
            payload: likes
        })
    } catch (error) {
        console.log(error);
    }
}
//retrieving all likes
router.get('/all', getAllLikes)

const checkExistingLike = async (req, res, next) => {
    let post_id = req.params.post_id
    let liker_id = req.params.liker_id
    try {
    const exists = await db.any(`
    SELECT COUNT(*)
    FROM likes 
    WHERE post_id = $1 AND liker_id = $2
    `, [post_id, liker_id])

    let existingLike = Number(exists[0].count)
    console.log(exists)
    console.log(existingLike)
    if (existingLike === 0){
        next()
    } else {
        console.log('like already exists')
        res.send({
            status: 'failure',
            message: 'you can\'t perform this operation'
        })
    }
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failure',
            message: 'you can\'t perform this operation'
        })
    }
}


const addLike = async (req, res, next) => {
    let post_id = req.params.post_id
    let liker_id = req.params.liker_id
    try {
        const liked = await db.one(`
        INSERT INTO likes (post_id, liker_id) 
        VALUES($1, $2)
        RETURNING *`, [post_id, liker_id])
        
       // const liked = await db.one(insertQuery, req.body)

        res.json({
            message: 'like added',
            payload: liked
        })

    } catch (error) {
        console.log(error);
        res.send({
            status: 'failure',
            message: 'you can\'t perform this operation'
        })
    }
}
//adding a like to a post
router.post('/add/:post_id/:liker_id', checkExistingLike, addLike)


const deleteLike = async (req, res, next) => {
    try {
        let deletedLike = await db.any(
        `DELETE from likes 
         WHERE post_id = $1 
         AND liker_id = $2 RETURNING *`, [req.params.post_id, req.params.liker_id])

        res.json({
            status: 'success',
            message: 'like removed',
            payload: deletedLike
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
        let likesOnPost = await db.any('SELECT * FROM likes WHERE post_id = $1', Number([req.params.post_id]))

        res.json({
            status: 'success',
            message: 'received number of likes',
            payload: likesOnPost
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