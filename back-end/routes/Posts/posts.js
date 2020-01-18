const express = require('express')
const router = express.Router()

const db = require('../../database/databasejs')


// ADD New Post
const addPic = async (req, res, next) => {
    // console.log('req.file', req.file, req)
    try {
        let imageUrl = "http://localhost:8080/" + req.file.path.replace('public/', '')
        const hashtag = [req.body.hashtag]
        const coords = req.body.coords
        let bodyCopy = Object.assign({}, req.body)

        bodyCopy.imageUrl = imageUrl
        bodyCopy.hashtag = hashtag
        bodyCopy.coords = coords

        let data = await db.any(`
            INSERT INTO posts (user_id, caption, hashtag,img,coords) VALUES (
                $/user_id/, $/caption/, $/hashtag/,$/imageUrl/,$/coords/
            ) RETURNING *

        `, bodyCopy)
        // console.log(data);

        res.json({
            message: 'image uploaded',
            payload: {
                imageUrl: imageUrl,
                data: data
            }
        })
        next(data)
    } catch (error) {
        console.log(error)
    }

}

const addHashtag = async (req, res, next, data) => {
    let hashtags = req[0].hashtag[0].split(',')
    let post_id = Number(req[0].id)
    console.log(hashtags, post_id)

    try {
        hashtags.forEach(async el => {
            console.log(el)

            let data = await db.any(`
                INSERT INTO hashtags (tag, post_id)
                VALUES ($1, ARRAY[$2])
                ON CONFLICT (tag)
                DO UPDATE SET post_id = (
                    SELECT post_id FROM hashtags 
                    WHERE tag = $1
                ) 
                || $2 RETURNING *;
            `, [el, post_id])
            
            console.log(data)
        })
    } catch (error) {
        console.log(error)
    }
}

router.post('/add', addPic, addHashtag)


// GET All posts
const getFeedPics = async (req, res, next) => {
    console.log('Get all posts route hit')
    // console.log('USER PASSPORT', req)
    try {
        let pictures = await db.any(`
            SELECT posts.time_post,posts.id, username, hashtag, caption, location, img, coords, profile_pic 
            FROM posts 
            INNER JOIN users 
            ON posts.user_id = users.id
        `)
        // console.log(pictures)

        res.json({
            status: 'success',
            message: 'retrieved all post',
            payload: pictures
        })
        next
    } catch (error) {
        console.log(error);
    }
}

router.get('/all', getFeedPics)

const getAllCoords = async (req, res, next) => {
    console.log('Get all posts route hit')
    // console.log('USER PASSPORT', req)
    try {
        let pictures = await db.any(`
        SELECT  coords FROM posts 
        INNER JOIN users ON posts.user_id = users.id 
        WHERE username = $1
        `, [req.params.username])
        // console.log(pictures)

        res.json({
            status: 'success',
            message: 'retrieved all post',
            payload: pictures
        })
    } catch (error) {
        console.log(error);
    }
}

router.get('/all/coords/:username', getAllCoords)

// GET Users information
const getUserInfo = async (req, res, next) => {

    try {
        let userPics = await db.any(`
            SELECT posts.time_post,username, hashtag, caption, location, img, profile_pic, posts.id
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

router.get('/profile/:username', getUserInfo)

// GET Posts based on a hashtag
const searchByHashtag = async (req, res, next) => {

    try {
        let post_ids = await db.any(`SELECT post_id FROM hashtags WHERE tag = $1`, [req.params.tag])
        let post_ids_arr = post_ids[0].post_id

        let hashtagPics = await db.any(`
            SELECT posts.id, username, hashtag, caption, location, img, profile_pic 
            FROM posts INNER JOIN users ON posts.user_id = users.id 
            WHERE posts.id IN (${post_ids_arr})
        `)

        res.json({
            status: 'success',
            message: 'retrieved all post',
            payload: hashtagPics
        })
    } catch (error) {
        console.log(error);
    }
}

router.get('/search/hashtag/:tag', searchByHashtag)

// DELETE Post
const deletePost = async (req, res, next) => {
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

router.delete('/delete/:post_id', deletePost)

// GET All posts based on location
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

router.get('/search/location/:place', searchByLocation)


const updatePost = async (req, res, next) => {
    let post_id = Number(req.params.post_id)
    let caption = req.body.caption
    let location = req.body.location
    let hashtag = req.body.hashtag

    console.log('post_id: ', typeof post_id, typeof caption, location, hashtag)

    try {
        if (caption) {
            let updatedCaption = await db.any(`UPDATE posts SET caption = $1 WHERE id =$2 RETURNING *`, [caption, post_id])
            res.status(200)
            res.json({
                payload: updatedCaption,
                message: `Success. Updated post # ${post_id}'s caption in posts table.`
            });
        } else if (location) {
            let updatedLocation = await db.any(`UPDATE posts SET location = $1 WHERE id =$2 RETURNING *`, [location, Number(post_id)])
            res.status(200)
            res.json({
                payload: updatedLocation,
                message: `Success. Updated post # ${post_id}'s location in posts table.`
            });
        } else if (hashtag) {
            let updatedHashtag = await db.any(
                `UPDATE posts SET hashtag = array_append(hashtag,$1) WHERE id = $2 RETURNING *`,
                [hashtag, Number(post_id)])
            res.status(200)
            res.json({
                payload: updatedHashtag,
                message: `Success. Updated post # ${post_id}'s hashtag in posts table.`
            });
        }
    } catch (error) {
        console.log('BREAKING')
        console.log(error);
    }
}

router.patch('/update/:post_id', updatePost)


module.exports = router;
