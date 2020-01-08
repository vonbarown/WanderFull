const express = require('express')
const router = express.Router()

const db = require('../../database/databasejs')


const addPic = async (req, res, next) => {
    console.log('req.file', req.file)
    try {
        let imageUrl = "http://localhost:8080/" + req.file.path.replace('public/', '')
        let bodyCopy = Object.assign({}, req.body)
        bodyCopy.imageUrl = imageUrl

        await db.none(`
            INSERT INTO posts (user_id, img, caption,hashtag) VALUES (
                $/user_id/, $/imageUrl/, $/caption/, $/hashtag/
            )
        `, bodyCopy)

        res.json({
            message: 'image uploaded',
            imageUrl: imageUrl
        })
    } catch (error) {
        console.log(error)
    }
}
//adding posts 
router.post('/add', addPic)


const getFeedPics = async (req, res, next) => {

    try {
        let pictures = await db.any(`
            SELECT username, hashtag, caption, img 
            FROM posts 
            INNER JOIN users 
            ON posts.user_id = users.id
        `)

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
router.get('/all', getFeedPics)

const getUserPics = async (req, res, next) => {

    try {
        let userPics = await db.any(`
            SELECT username, hashtag, caption, img 
            FROM posts 
            INNER JOIN users 
            ON posts.user_id = users.id 
            WHERE username = $1
        `, [req.params.username])

        res.json({
            status: 'success',
            message: 'retrieved all post',
            payload: userPics
        })
    } catch (error) {
        console.log(error);
    }
}
//retrieving all user posts
router.get('/profile/:username', getUserPics)

const searchByHashtag = async (req, res, next) => {

    try {
        let userPics = await db.any(`
            SELECT username, hashtag, caption, img 
            FROM posts 
            INNER JOIN users 
            ON posts.user_id = users.id 
            WHERE hashtag = $1
        `, [req.params.tag])

        res.json({
            status: 'success',
            message: 'retrieved all post',
            payload: userPics
        })
    } catch (error) {
        console.log(error);
    }
}
//searching by hashtag
router.get('/hashtag/:tag', searchByHashtag)

const deletePhoto = async (req, res, next) => {
    try {
        let deletedPhoto = await db.one(`
            DELETE from posts 
            WHERE id = $1 RETURNING *
        `, req.body.id)

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
router.delete('/:post_id', deletePhoto)


//update post  

// get post by location 

module.exports = router;
