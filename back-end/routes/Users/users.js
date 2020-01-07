var express = require('express');
var router = express.Router();
const db = require('../../database/databasejs');
const hash = require('js-sha256').sha256;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('I am a user route')
});

router.get('/authenticate', async (req, res, next) => {
  console.log('Authentication')
  console.log(req.body)
  const { username, password } = req.body
  const hashedPassword = hash(password)
  console.log(hashedPassword)
  const query = `SELECT * FROM users WHERE username = $1 AND password = $2`
  const data = await db.any(query, [username, hashedPassword])
  console.log(data)
  res.json(data)
})

router.post('/register', async (req, res, next) => {
  console.log(req.body)

  const { username, password, firstname, lastname, email } = req.body
  const hashedPassword = hash(password)

  const query = `
    INSERT INTO users (username, password, firstname, lastname, email) 
    values (
      $1, $2, $3, $4, $5
    ) 
  `
  try {
    const data = await db.any(query, [username, hashedPassword, firstname, lastname, email])
    console.log(data)
    console.log('User Created')
    res.send('User created')
  } catch (err) {
    console.error(err)
    console.log('User not created')
    res.send('User not created')
  }
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
