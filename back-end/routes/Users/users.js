var express = require('express');
var router = express.Router();
const db = require('../../database/databasejs');
const hash = require('js-sha256').sha256;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('I am a user route')
});

router.post('/authenticate', async (req, res, next) => {
  console.log('Authentication route hit')
  console.log('Request body: ', {...req.body})
  let { username, password } = req.body
  const hashedPassword = hash(password)
  console.log(password, hashedPassword)
  const query = `SELECT * FROM users WHERE username = $1 AND password = $2`
  const data = await db.one(query, [username, hashedPassword])
  console.log('User Query response data: ', data)
  delete data.password
  // console.log('REQUEST: ', req)
  res.json({
    status: 'success',
    message: 'User logged in',
    payload: data
  })

})

const getUser = async (req, res, next) => {

  try {
    let user = await db.any('SELECT * FROM users WHERE username = $1', req.params.username)

    res.json({
      status: 'success',
      message: 'retrieved user',
      payload: user
    })
  } catch (error) {
    console.log(error);
  }
}
//retrieving one users info
router.get('/:username', getUser)


const updateUserInfo = async (req, res, next) => {
  // username, profile_pic
  let user_id = req.body.user_id
  let username = req.body.username
  let profile_pic = req.body.profile_pic 
console.log(user_id, username)
  try {
    if (username) {
      let updatedUsername = await db.any("UPDATE users SET username = $1 WHERE id = $2 RETURNING *", [username, user_id])
      res.status(200)
      res.json({
        payload: updatedUsername,
        message: `Success. Updated ${username} in users table.`
      });
    } else if (profile_pic) {
      let updatedProfile_pic = await db.any("UPDATE users SET email = $1 WHERE id = $2 RETURNING *", [profile_pic, user_id])
      res.status(200)
      res.json({
        payload: updatedProfile_pic,
        message: `Success. Updated ${profile_pic} in users table.`
      });
    }
  } catch (error) {
    console.log(error);
  }
}

router.patch('/update', updateUserInfo)


const deactivateUser = async (req, res, next) => {
  try {
    let deactivatedUser = await db.one(`
        UPDATE users
        SET active = $1
        WHERE username = $2
        RETURNING username, active 
    `, ['false', req.params.username])

    res.json({
        status: 'success',
        message: 'account deactivated',
        payload: deactivatedUser
    })
} catch (error) {
    console.log(error);
    res.send({
        status: 'failure',
        message: 'you can\'t perform this operation'
    })
}
}

router.patch('/deactivate/:username', deactivateUser)

// middleware to check if user exists
// reactivate user

module.exports = router;
