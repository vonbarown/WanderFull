const express = require('express')
const router = express.Router()

const db = require('../../database/databasejs')


const addPic = async (req, res, next) => {
    console.log('req.file', req.file)
    try {
        let imageUrl = "http://localhost:8080/" + req.file.path.replace('public/', '')
        let bodyCopy = Object.assign({}, req.body)
        bodyCopy.imageUrl = imageUrl

        await db.any(`
            INSERT INTO posts (user_id, caption,hashtag) VALUES (
                $/user_id/, $/caption/, $/hashtag/
            ) RETURNING (id, hashtag)
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
            SELECT username, hashtag, caption, location, img, profile_pic 
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
            SELECT username, hashtag, caption, location, img, profile_pic
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
        let hashtagPics = await db.any(`
            SELECT username, hashtag, caption, location, img, profile_pic
            FROM posts 
            INNER JOIN users 
            ON posts.user_id = users.id 
            WHERE $1 = ANY(hashtag)
        `, [req.params.tag])

        res.json({
            status: 'success',
            message: 'retrieved all post',
            payload: hashtagPics
        })
    } catch (error) {
        console.log(error);
    }
}
//searching by hashtag
//SELECT * FROM posts WHERE id IN (1, 2, 3);
// SELECT * FROM posts WHERE '#this' = ANY(hashtag);
router.get('/search/hashtag/:tag', searchByHashtag)

const deletePhoto = async (req, res, next) => {
    try {
        let deletedPhoto = await db.one(`
            DELETE from posts 
            WHERE id = $1 RETURNING *
        `, req.params.post_id)

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

 
const searchByLocation = async (req, res, next) => {

    try {
        let locationPics = await db.any(`
            SELECT username, hashtag, caption, location, img, profile_pic
            FROM posts 
            INNER JOIN users 
            ON posts.user_id = users.id 
            WHERE location = $1
        `, [req.params.place])

        res.json({
            status: 'success',
            message: 'retrieved all post',
            payload: locationPics
        })
    } catch (error) {
        console.log(error);
    }
}

// get post by location 
router.get('/search/location/:place', searchByLocation)


//update post 


module.exports = router;
