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
  const query = `SELECT * FROM users WHERE username = $1 AND password = $2`
  const data = await db.one(query, [username, hashedPassword])
  console.log('User Query response data: ', data)
  delete data.password
  console.log('REQUEST: ', req)
  res.json({
    status: 'success',
    message: 'User logged in',
    payload: data
  })

})

const getUser = async (req, res, next) => {

  try {
    let user = await db.any('SELECT * FROM users WHERE username = $1', req.body.username)

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
router.get('/username', getUser)


const updateUserInfo = async (req, res, next) => {
  // username, password, firstname, lastname, email, profile_pic
  let user_id = req.body.user_id
  let username = req.body.username
  let password = req.body.password
  let firstname = req.body.firstname
  let lastname = req.body.lastname 
  let email = req.body.email
  let profile_pic = req.body.profile_pic 

  try {
    if (username) {
      let updatedUsername = await db.any("UPDATE users SET username = $1 WHERE id = $2 RETURNING *", [username, user_id])
      res.status(200)
      res.json({
        payload: updatedUsername,
        message: `Success. Updated ${username} in users table.`
      });
    } else if(password) {
      let updatedPassword = await db.any("UPDATE users SET password = $1 WHERE id = $2 RETURNING *", [password, user_id])
      res.status(200)
      res.json({
        payload: updatedPassword,
        message: `Success. Updated ${password} in users table.`
      });
    }
  } catch (error) {
    console.log(error);
  }
}

router.patch('/', updateUserInfo)


module.exports = router;
